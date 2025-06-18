import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../shared/models/client_model';
import { DetteService } from '../../shared/services/impl/dette.service';
import { ClientService } from '../../shared/services/impl/client.service';
import { RequestResponse } from '../../shared/models/request.response.model';
import { ROUTES } from '../../routing/app.paths';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import {Dette} from '../../shared/models/dette_model';

@Component({
  selector: 'app-dettes',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './dettes.component.html',
  styleUrl: './dettes.component.css'
})
export class DettesComponent implements OnInit {
  dettes: Dette[] = [];
  clients: Client[] = [];
  clientsMap: Map<string, Client> = new Map();
  loading = false;
  error: string | null = null;
  searchQuery = '';
  filterStatus = 'all'; // all, soldees, non-soldees
  selectedClientId = '';
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
    private detteService: DetteService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadClientsAndDettes();
  }

  loadClientsAndDettes(): void {
    this.loading = true;
    this.error = null;

    // Charger clients et dettes en parallèle
    forkJoin({
      clients: this.clientService.getAll(),
      dettes: this.detteService.getAll(this.currentPage, this.size)
    }).subscribe({
      next: (responses) => {
        // Traiter les clients
        if (responses.clients.status === 200) {
          this.clients = responses.clients.results || [];
          this.buildClientsMap();
        }

        // Traiter les dettes
        if (responses.dettes.status === 200) {
          this.dettes = responses.dettes.results || [];
          this.updatePagination(responses.dettes);
        } else {
          this.error = 'Erreur lors du chargement des dettes';
          this.dettes = [];
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des données';
        this.dettes = [];
        this.loading = false;
        console.error('Erreur:', error);
      }
    });
  }

  loadDettes(page: number = 0): void {
    this.loading = true;
    this.error = null;
    this.isSearching = false;

    let detteObservable;

    if (this.filterStatus === 'soldees') {
      detteObservable = this.detteService.getDettesSoldees(page, this.size);
    } else if (this.filterStatus === 'non-soldees') {
      detteObservable = this.detteService.getDettesNonSoldees(page, this.size);
    } else if (this.selectedClientId) {
      detteObservable = this.detteService.getByClientId(this.selectedClientId, page, this.size);
    } else {
      detteObservable = this.detteService.getAll(page, this.size);
    }

    detteObservable.subscribe({
      next: (response: RequestResponse) => {
        console.log('Réponse loadDettes:', response);
        if (response.status === 200) {
          this.dettes = response.results || [];
          this.updatePagination(response);
        } else {
          this.error = 'Erreur lors du chargement des dettes';
          this.dettes = [];
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des dettes';
        this.dettes = [];
        this.loading = false;
        console.error('Erreur loadDettes:', error);
      }
    });
  }

  buildClientsMap(): void {
    this.clientsMap.clear();
    this.clients.forEach(client => {
      this.clientsMap.set(client.id, client);
    });
  }

  getClientName(clientId: string): string {
    const client = this.clientsMap.get(clientId);
    return client ? client.nom : 'Client inconnu';
  }

  onFilterChange(): void {
    this.currentPage = 0;
    this.loadDettes(0);
  }

  onClientFilterChange(): void {
    this.currentPage = 0;
    this.filterStatus = 'all';
    this.loadDettes(0);
  }

  searchDettes(page: number = 0): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.error = null;
      this.isSearching = true;

      // Pour la recherche, on utilise getAll et on filtre côté client
      // car json-server ne supporte pas la recherche sur des relations
      this.detteService.getAll().subscribe({
        next: (response: RequestResponse) => {
          if (response.status === 200) {
            const allDettes = response.results || [];
            const filteredDettes = this.filterDettesBySearch(allDettes);

            // Pagination manuelle
            const startIndex = page * this.size;
            const endIndex = startIndex + this.size;
            this.dettes = filteredDettes.slice(startIndex, endIndex);

            // Mise à jour de la pagination
            this.updatePaginationForSearch(filteredDettes.length, page);
          } else {
            this.error = 'Erreur lors de la recherche';
            this.dettes = [];
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors de la recherche';
          this.dettes = [];
          this.loading = false;
          console.error('Erreur recherche:', error);
        }
      });
    } else {
      this.clearSearch();
    }
  }

  filterDettesBySearch(dettes: Dette[]): Dette[] {
    const query = this.searchQuery.toLowerCase().trim();
    return dettes.filter(dette => {
      const clientName = this.getClientName(dette.clientId).toLowerCase();
      const detteId = dette.id.toLowerCase();
      const date = dette.date;

      return clientName.includes(query) ||
        detteId.includes(query) ||
        date.includes(query) ||
        dette.montantDette.toString().includes(query);
    });
  }

  updatePaginationForSearch(totalElements: number, currentPage: number): void {
    this.totalElements = totalElements;
    this.totalPages = Math.ceil(totalElements / this.size);
    this.currentPage = currentPage;
    this.hasNextPage = (currentPage + 1) < this.totalPages;
    this.hasPreviousPage = currentPage > 0;
    this.generatePages();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.isSearching = false;
    this.selectedClientId = '';
    this.filterStatus = 'all';
    this.loadDettes(0);
  }

  onPageChange(page: number): void {
    if (page < 0 || page >= this.totalPages) {
      return;
    }

    this.currentPage = page;

    if (this.isSearching && this.searchQuery.trim()) {
      this.searchDettes(page);
    } else {
      this.loadDettes(page);
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

  goToAddDette(): void {
    this.router.navigate([ROUTES.DETTE.ADD]);
  }

  goToDetteDetail(detteId: string): void {
    this.router.navigate([ROUTES.DETTE.DETAIL(detteId)]);
  }

  goToEditDette(detteId: string): void {
    this.router.navigate([ROUTES.DETTE.EDIT(detteId)]);
  }

  viewDettePaiements(detteId: string): void {
    this.router.navigate([ROUTES.PAIEMENT.BY_DETTE(detteId)]);
  }

  viewDetteLignes(detteId: string): void {
    this.router.navigate([ROUTES.LIGNE.BY_DETTE(detteId)]);
  }

  deleteDette(dette: Dette): void {
    const clientName = this.getClientName(dette.clientId);
    if (confirm(`Êtes-vous sûr de vouloir supprimer la dette de ${clientName} du ${dette.date} ?\n\nCette action est irréversible.`)) {
      this.loading = true;
      this.error = null;

      this.detteService.delete(dette.id).subscribe({
        next: (response: RequestResponse) => {
          if (response.status === 200 || response.status === 204) {
            const pageToLoad = this.dettes.length === 1 && this.currentPage > 0
              ? this.currentPage - 1
              : this.currentPage;

            if (this.isSearching && this.searchQuery.trim()) {
              this.searchDettes(pageToLoad);
            } else {
              this.loadDettes(pageToLoad);
            }
          } else {
            this.error = 'Erreur lors de la suppression de la dette';
            this.loading = false;
          }
        },
        error: (error) => {
          this.error = 'Erreur lors de la suppression de la dette';
          this.loading = false;
          console.error('Erreur suppression:', error);
        }
      });
    }
  }

  getStatusBadgeClass(dette: Dette): string {
    if (dette.montantRestant === 0) {
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800';
    } else if (dette.montantPaye > 0) {
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800';
    } else {
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800';
    }
  }

  getStatusText(dette: Dette): string {
    if (dette.montantRestant === 0) {
      return 'Soldée';
    } else if (dette.montantPaye > 0) {
      return 'Partielle';
    } else {
      return 'Impayée';
    }
  }

  trackByDetteId(index: number, dette: Dette): string {
    return dette.id;
  }

  getProgressPercentage(dette: Dette): number {
    if (dette.montantDette === 0) return 0;
    return (dette.montantPaye / dette.montantDette) * 100;
  }
}
