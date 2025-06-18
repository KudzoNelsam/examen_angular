import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../shared/services/impl/article.service';
import { RequestResponse } from '../../shared/models/request.response.model';
import { ROUTES } from '../../routing/app.paths';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf, CurrencyPipe } from '@angular/common';
import {Article} from '../../shared/models/article_model';

@Component({
  selector: 'app-articles',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  loading = false;
  error: string | null = null;
  searchQuery = '';
  stockFilter = 'all'; // all, available, out-of-stock
  isSearching = false;

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
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(page: number = 0): void {
    this.loading = true;
    this.error = null;
    this.isSearching = false;

    let articleObservable;

    if (this.stockFilter === 'available') {
      articleObservable = this.articleService.getAvailableArticles(page, this.size);
    } else {
      articleObservable = this.articleService.getAll(page, this.size);
    }

    articleObservable.subscribe({
      next: (response: RequestResponse) => {
        console.log('Réponse loadArticles:', response);
        if (response.status === 200) {
          let articles = response.results || [];

          // Filtrer côté client pour les articles en rupture
          if (this.stockFilter === 'out-of-stock') {
            articles = articles.filter((article: Article) => article.qteStock === 0);
          }

          this.articles = articles;
          this.updatePagination(response);
        } else {
          this.error = 'Erreur lors du chargement des articles';
          this.articles = [];
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des articles';
        this.articles = [];
        this.loading = false;
        console.error('Erreur loadArticles:', error);
      }
    });
  }

  searchArticles(page: number = 0): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.error = null;
      this.isSearching = true;

      console.log('Recherche avec query:', this.searchQuery, 'page:', page);

      this.articleService.searchByLibelle(this.searchQuery.trim(), page, this.size).subscribe({
        next: (response: RequestResponse) => {
          console.log('Réponse recherche articles:', response);
          if (response.status === 200) {
            this.articles = response.results || [];
            this.updatePagination(response);
          } else {
            this.error = 'Erreur lors de la recherche';
            this.articles = [];
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors de la recherche';
          this.articles = [];
          this.loading = false;
          console.error('Erreur recherche:', error);
        }
      });
    } else {
      this.clearSearch();
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.isSearching = false;
    this.stockFilter = 'all';
    this.loadArticles(0);
  }

  onStockFilterChange(): void {
    this.currentPage = 0;
    this.searchQuery = '';
    this.isSearching = false;
    this.loadArticles(0);
  }

  onPageChange(page: number): void {
    if (page < 0 || page >= this.totalPages) {
      return;
    }

    this.currentPage = page;

    if (this.isSearching && this.searchQuery.trim()) {
      this.searchArticles(page);
    } else {
      this.loadArticles(page);
    }
  }

  updatePagination(response: RequestResponse): void {
    this.currentPage = response.currentPage || 0;
    this.totalPages = response.totalPages || 0;
    this.totalElements = response.totalElements || 0;
    this.hasNextPage = response.hasNextPage || false;
    this.hasPreviousPage = response.hasPreviousPage || false;
    this.pages = response.pages || [];

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

  goToAddArticle(): void {
    this.router.navigate([ROUTES.ARTICLE.ADD]);
  }

  goToArticleDetail(articleId: string): void {
    this.router.navigate([ROUTES.ARTICLE.DETAIL(articleId)]);
  }

  goToEditArticle(articleId: string): void {
    this.router.navigate([ROUTES.ARTICLE.EDIT(articleId)]);
  }

  deleteArticle(article: Article): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'article "${article.libelle}" ?\n\nCette action est irréversible.`)) {
      this.loading = true;
      this.error = null;

      this.articleService.delete(article.id).subscribe({
        next: (response: RequestResponse) => {
          if (response.status === 200 || response.status === 204) {
            const pageToLoad = this.articles.length === 1 && this.currentPage > 0
              ? this.currentPage - 1
              : this.currentPage;

            if (this.isSearching && this.searchQuery.trim()) {
              this.searchArticles(pageToLoad);
            } else {
              this.loadArticles(pageToLoad);
            }
          } else {
            this.error = 'Erreur lors de la suppression de l\'article';
            this.loading = false;
          }
        },
        error: (error) => {
          this.error = 'Erreur lors de la suppression de l\'article';
          this.loading = false;
          console.error('Erreur suppression:', error);
        }
      });
    }
  }

  updateStock(article: Article, newStock: number): void {
    if (newStock < 0) {
      this.error = 'Le stock ne peut pas être négatif';
      return;
    }

    this.articleService.updateStock(article.id, newStock).subscribe({
      next: (response: RequestResponse) => {
        if (response.status === 200) {
          // Mettre à jour le stock localement
          const index = this.articles.findIndex(a => a.id === article.id);
          if (index !== -1) {
            this.articles[index].qteStock = newStock;
          }
        } else {
          this.error = 'Erreur lors de la mise à jour du stock';
        }
      },
      error: (error) => {
        this.error = 'Erreur lors de la mise à jour du stock';
        console.error('Erreur update stock:', error);
      }
    });
  }

  getStockBadgeClass(qteStock: number): string {
    if (qteStock === 0) {
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800';
    } else if (qteStock <= 5) {
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800';
    } else {
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800';
    }
  }

  getStockText(qteStock: number): string {
    if (qteStock === 0) {
      return 'Rupture';
    } else if (qteStock <= 5) {
      return 'Stock faible';
    } else {
      return 'Disponible';
    }
  }

  trackByArticleId(index: number, article: Article): string {
    return article.id;
  }

  onSearchInput(): void {
    // Optionnel : recherche automatique après 300ms de pause
  }
}
