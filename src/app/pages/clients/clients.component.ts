import {Component} from '@angular/core';
import {Client} from '../../shared/models/client_model';
import {ClientService} from '../../shared/services/impl/client.service';
import {RequestResponse} from '../../shared/models/request.response.model';
import {ROUTES} from '../../routing/app.paths';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-clients',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  clients: Client[] = [];
  loading = false;
  error: string | null = null;
  searchQuery = '';

  // Pagination
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  size = 7;
  hasNextPage = false;
  hasPreviousPage = false;
  pages: number[] = [];

  // Exposer Math pour le template
  Math = Math;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(page: number = 0): void {
    this.loading = true;
    this.error = null;

    this.clientService.getAll(page, this.size).subscribe({
      next: (response: RequestResponse) => {
        console.log(response.status);
        if (response.status === 200) {
          this.clients = response.results || [];
          this.updatePagination(response);
        } else {
          this.error = 'Erreur lors du chargement des clients';
          this.clients = [];
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des clients';
        this.clients = [];
        this.loading = false;
        console.error('Erreur:', error);
      }
    });
  }

  searchClients(): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.error = null;

      this.clientService.search(this.searchQuery, 0, this.size).subscribe({
        next: (response: RequestResponse) => {
          if (response.status === 200) {
            this.clients = response.results || [];
            this.updatePagination(response);
          } else {
            this.error = 'Erreur lors de la recherche';
            this.clients = [];
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors de la recherche';
          this.clients = [];
          this.loading = false;
          console.error('Erreur:', error);
        }
      });
    } else {
      this.loadClients();
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.loadClients();
  }

  onPageChange(page: number): void {
    if (page < 0 || page >= this.totalPages) {
      return;
    }

    this.currentPage = page;
    if (this.searchQuery.trim()) {
      this.searchClients();
    } else {
      this.loadClients(page);
    }
  }

  updatePagination(response: RequestResponse): void {
    this.currentPage = response.currentPage || 0;
    this.totalPages = response.totalPages || 0;
    this.totalElements = response.totalElements || 0;
    this.hasNextPage = response.hasNextPage || false;
    this.hasPreviousPage = response.hasPreviousPage || false;
    this.pages = response.pages || [];

    // Si pas de pages dans la réponse, on les génère
    if (this.pages.length === 0 && this.totalPages > 0) {
      this.generatePages();
    }
  }

  generatePages(): void {
    this.pages = [];
    const startPage = Math.max(0, this.currentPage - 2);
    const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }

  goToAddClient(): void {
    this.router.navigate([ROUTES.CLIENT.ADD]);
  }

  goToClientDetail(clientId: string): void {
    this.router.navigate([ROUTES.CLIENT.DETAIL(clientId)]);
  }

  goToEditClient(clientId: string): void {
    this.router.navigate([ROUTES.CLIENT.EDIT(clientId)]);
  }

  viewClientDettes(clientId: string): void {
    // this.router.navigate([ROUTES.DETTE.BY_CLIENT(clientId)]);
    this.router.navigate([ROUTES.DETTE.LIST], { queryParams: { clientId } });
  }

  deleteClient(client: Client): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le client ${client.nom} ?\n\nCette action est irréversible.`)) {
      this.loading = true;
      this.error = null;

      this.clientService.delete(client.id).subscribe({
        next: (response: RequestResponse) => {
          if (response.status === 200 || response.status === 204) {
            // Recharger la page actuelle ou la précédente si on était sur la dernière page
            const pageToLoad = this.clients.length === 1 && this.currentPage > 0
              ? this.currentPage - 1
              : this.currentPage;
            this.loadClients(pageToLoad);
          } else {
            this.error = 'Erreur lors de la suppression du client';
            this.loading = false;
          }
        },
        error: (error) => {
          this.error = 'Erreur lors de la suppression du client';
          this.loading = false;
          console.error('Erreur:', error);
        }
      });
    }
  }

  // Méthode trackBy pour optimiser les performances de ngFor
  trackByClientId(index: number, client: Client): string {
    return client.id;
  }

  // Méthode pour obtenir les informations de pagination pour l'affichage
  getPaginationInfo(): string {
    if (this.totalElements === 0) {
      return 'Aucun résultat';
    }

    const start = this.currentPage * this.size + 1;
    const end = Math.min((this.currentPage + 1) * this.size, this.totalElements);
    return `Affichage de ${start} à ${end} sur ${this.totalElements} résultats`;
  }

  // Méthode pour vérifier si on peut aller à une page spécifique
  canGoToPage(page: number): boolean {
    return page >= 0 && page < this.totalPages && page !== this.currentPage;
  }
}
