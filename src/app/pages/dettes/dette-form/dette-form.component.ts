import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Client} from '../../../shared/models/client_model';
import {Article} from '../../../shared/models/article_model';
import {PanierItem} from '../../../shared/models/panier_model';
import {DetteService} from '../../../shared/services/impl/dette.service';
import {ClientService} from '../../../shared/services/impl/client.service';
import {ArticleService} from '../../../shared/services/impl/article.service';
import {LigneService} from '../../../shared/services/impl/ligne.service';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {RequestResponse} from '../../../shared/models/request.response.model';
import {Dette} from '../../../shared/models/dette_model';
import {Ligne} from '../../../shared/models/ligne_model';
import {ROUTES} from '../../../routing/app.paths';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-dette-form',
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './dette-form.component.html',
  styleUrl: './dette-form.component.css'
})
export class DetteFormComponent {
  detteForm: FormGroup;
  clients: Client[] = [];
  articles: Article[] = [];
  panier: PanierItem[] = [];

  loading = false;
  loadingClients = false;
  loadingArticles = false;
  error: string | null = null;
  success: string | null = null;

  searchArticleQuery = '';
  selectedClientId = '';

  // Pagination des articles
  currentPage = 0;
  totalPages = 0;
  size = 5;
  hasNextPage = false;
  hasPreviousPage = false;

  constructor(
    private formBuilder: FormBuilder,
    private detteService: DetteService,
    private clientService: ClientService,
    private articleService: ArticleService,
    private ligneService: LigneService,
    private router: Router
  ) {
    this.detteForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      clientId: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  loadInitialData(): void {
    this.loadingClients = true;
    this.loadingArticles = true;

    forkJoin({
      clients: this.clientService.getAll(),
      articles: this.articleService.getAvailableArticles(this.currentPage, this.size)
    }).subscribe({
      next: (responses) => {
        console.log(responses);
        // Charger les clients
        if (responses.clients.status === 200) {
          this.clients = responses.clients.results || [];
        }
        this.loadingClients = false;

        // Charger les articles
        if (responses.articles.status === 200) {
          this.articles = responses.articles.results || [];
          this.updateArticlesPagination(responses.articles);
        }
        this.loadingArticles = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des données';
        this.loadingClients = false;
        this.loadingArticles = false;
        console.error('Erreur:', error);
      }
    });
  }

  loadArticles(page: number = 0): void {
    this.loadingArticles = true;
    this.currentPage = page;

    let articleObservable;
    if (this.searchArticleQuery.trim()) {
      articleObservable = this.articleService.searchByLibelle(this.searchArticleQuery, page, this.size);
    } else {
      articleObservable = this.articleService.getAvailableArticles(page, this.size);
    }

    articleObservable.subscribe({
      next: (response: RequestResponse) => {
        if (response.status === 200) {
          this.articles = response.results || [];
          this.updateArticlesPagination(response);
        } else {
          this.error = 'Erreur lors du chargement des articles';
        }
        this.loadingArticles = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des articles';
        this.loadingArticles = false;
        console.error('Erreur:', error);
      }
    });
  }

  updateArticlesPagination(response: RequestResponse): void {
    this.totalPages = response.totalPages || 0;
    this.hasNextPage = response.hasNextPage || false;
    this.hasPreviousPage = response.hasPreviousPage || false;
  }

  searchArticles(): void {
    this.currentPage = 0;
    this.loadArticles(0);
  }

  clearSearchArticles(): void {
    this.searchArticleQuery = '';
    this.currentPage = 0;
    this.loadArticles(0);
  }

  onArticlePageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadArticles(page);
    }
  }

  ajouterAuPanier(article: Article, quantite: number): void {
    if (quantite <= 0) {
      this.error = 'La quantité doit être supérieure à 0';
      return;
    }

    if (quantite > article.qteStock) {
      this.error = `Stock insuffisant. Stock disponible: ${article.qteStock}`;
      return;
    }

    // Vérifier si l'article existe déjà dans le panier
    const existingItem = this.panier.find(item => item.article.id === article.id);

    if (existingItem) {
      const nouvelleQuantite = existingItem.quantite + quantite;
      if (nouvelleQuantite > article.qteStock) {
        this.error = `Stock insuffisant. Vous avez déjà ${existingItem.quantite} dans le panier. Stock disponible: ${article.qteStock}`;
        return;
      }
      existingItem.quantite = nouvelleQuantite;
      existingItem.sousTotal = nouvelleQuantite * article.prixVente;
    } else {
      const panierItem: PanierItem = {
        article: article,
        quantite: quantite,
        sousTotal: quantite * article.prixVente
      };
      this.panier.push(panierItem);
    }

    this.error = null;
    // Réinitialiser le champ quantité
    const input = document.getElementById(`qty-${article.id}`) as HTMLInputElement;
    if (input) {
      input.value = '1';
    }
  }

  modifierQuantitePanier(item: PanierItem, nouvelleQuantite: number): void {
    if (nouvelleQuantite <= 0) {
      this.retirerDuPanier(item);
      return;
    }

    if (nouvelleQuantite > item.article.qteStock) {
      this.error = `Stock insuffisant. Stock disponible: ${item.article.qteStock}`;
      return;
    }

    item.quantite = nouvelleQuantite;
    item.sousTotal = nouvelleQuantite * item.article.prixVente;
    this.error = null;
  }

  retirerDuPanier(item: PanierItem): void {
    const index = this.panier.findIndex(p => p.article.id === item.article.id);
    if (index > -1) {
      this.panier.splice(index, 1);
    }
  }

  viderPanier(): void {
    if (confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
      this.panier = [];
    }
  }

  getTotalPanier(): number {
    return this.panier.reduce((total, item) => total + item.sousTotal, 0);
  }

  getNombreArticlesPanier(): number {
    return this.panier.reduce((total, item) => total + item.quantite, 0);
  }

  getQuantiteDisponible(article: Article): number {
    const itemInPanier = this.panier.find(item => item.article.id === article.id);
    if (itemInPanier) {
      return article.qteStock - itemInPanier.quantite;
    }
    return article.qteStock;
  }

  isArticleInPanier(article: Article): boolean {
    return this.panier.some(item => item.article.id === article.id);
  }

  getQuantiteInPanier(article: Article): number {
    const item = this.panier.find(item => item.article.id === article.id);
    return item ? item.quantite : 0;
  }

  onSubmit(): void {
    if (this.detteForm.invalid) {
      this.markFormGroupTouched();
      this.error = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    if (this.panier.length === 0) {
      this.error = 'Veuillez ajouter au moins un article au panier';
      return;
    }

    this.creerDette();
  }

  private creerDette(): void {
    this.loading = true;
    this.error = null;

    const formData = this.detteForm.value;
    const montantTotal = this.getTotalPanier();

    const detteData: Partial<Dette> = {
      id: this.generateDetteId(),
      clientId: formData.clientId,
      date: formData.date,
      montantDette: montantTotal,
      montantPaye: 0,
      montantRestant: montantTotal
    };

    // Créer la dette
    this.detteService.create(detteData).subscribe({
      next: (detteResponse: RequestResponse) => {
        if (detteResponse.status === 201 || detteResponse.status === 200) {
          const detteCreee = detteResponse.results;
          this.creerLignes(detteCreee.id);
        } else {
          this.error = 'Erreur lors de la création de la dette';
          this.loading = false;
        }
      },
      error: (error) => {
        this.error = 'Erreur lors de la création de la dette';
        this.loading = false;
        console.error('Erreur creation dette:', error);
      }
    });
  }

  private creerLignes(detteId: string): void {
    const lignesObservables = this.panier.map(item => {
      const ligneData: Partial<Ligne> = {
        id: this.generateLigneId(),
        detteId: detteId,
        articleId: item.article.id,
        qteCom: item.quantite
      };
      return this.ligneService.create(ligneData);
    });

    forkJoin(lignesObservables).subscribe({
      next: (responses) => {
        const allSuccess = responses.every(response =>
          response.status === 201 || response.status === 200
        );

        if (allSuccess) {
          this.success = 'Dette créée avec succès!';
          setTimeout(() => {
            this.router.navigate([ROUTES.DETTE.LIST]);
          }, 2000);
        } else {
          this.error = 'Erreur lors de la création de certaines lignes';
          this.loading = false;
        }
      },
      error: (error) => {
        this.error = 'Erreur lors de la création des lignes';
        this.loading = false;
        console.error('Erreur creation lignes:', error);
      }
    });
  }

  generateDetteId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `d${timestamp}${random}`;
  }

  generateLigneId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `l${timestamp}${random}`;
  }

  markFormGroupTouched(): void {
    Object.keys(this.detteForm.controls).forEach(key => {
      const control = this.detteForm.get(key);
      control?.markAsTouched();
    });
  }

  goBack(): void {
    if (this.panier.length > 0 && !this.success) {
      if (confirm('Vous avez des articles dans le panier. Voulez-vous vraiment quitter ?')) {
        this.router.navigate([ROUTES.DETTE.LIST]);
      }
    } else {
      this.router.navigate([ROUTES.DETTE.LIST]);
    }
  }

  resetForm(): void {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser ? Cela videra le panier.')) {
      this.detteForm.reset();
      this.detteForm.patchValue({
        date: new Date().toISOString().split('T')[0]
      });
      this.panier = [];
      this.error = null;
      this.success = null;
    }
  }

  // Getters pour le template
  get clientId() { return this.detteForm.get('clientId'); }
  get date() { return this.detteForm.get('date'); }

  trackByArticleId(index: number, article: Article): string {
    return article.id;
  }

  trackByPanierId(index: number, item: PanierItem): string {
    return item.article.id;
  }

  protected readonly document = document;
}
