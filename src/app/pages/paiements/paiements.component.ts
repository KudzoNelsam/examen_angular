import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetteService } from '../../shared/services/impl/dette.service';
import { PaiementService } from '../../shared/services/impl/paiement.service';
import { ClientService } from '../../shared/services/impl/client.service';
import { Dette } from '../../shared/models/dette_model';
import { Paiement } from '../../shared/models/paiement_model';
import { Client } from '../../shared/models/client_model';
import { RequestResponse } from '../../shared/models/request.response.model';
import {CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgForOf, NgIf, PercentPipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ROUTES } from '../../routing/app.paths';

@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  imports: [
    DatePipe,
    NgForOf,
    CurrencyPipe,
    FormsModule,
    NgIf,
    NgClass,
    DecimalPipe
  ],
  styleUrls: ['./paiements.component.css']
})
export class PaiementsComponent implements OnInit {
  detteDetail: Dette & { clientName?: string } = {
    id: '',
    clientId: '',
    date: '',
    montantDette: 0,
    montantPaye: 0,
    montantRestant: 0
  };
  paiements: Paiement[] = [];
  showPaiementForm = false;
  paiementError = '';
  paiementSuccess = '';
  nouveauPaiement = { montant: null as number | null, date: '' };
  loading = false;
  loadingPaiements = false;
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private detteService: DetteService,
    private paiementService: PaiementService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    const detteId = this.route.snapshot.paramMap.get('detteId');
    if (!detteId) {
      this.router.navigate([ROUTES.DETTE.LIST]);
      return;
    }
    this.loading = true;
    this.detteService.getById(detteId).subscribe({
      next: (resp: RequestResponse) => {
        const dette: Dette = resp.results;
        this.detteDetail = { ...dette };
        this.clientService.getById(dette.clientId).subscribe({
          next: (clientResp: RequestResponse) => {
            const client: Client = clientResp.results;
            this.detteDetail.clientName = `${client.nom} || ''}`.trim();
          }
        });
        this.loadPaiements();
      },
      error: () => {
        this.loading = false;
        this.router.navigate([ROUTES.DETTE.LIST]);
      }
    });
  }

  loadPaiements(): void {
    this.loadingPaiements = true;
    this.paiementService.getByDetteId(this.detteDetail.id).subscribe({
      next: (resp: RequestResponse) => {
        // S'assurer que c'est un tableau et filtrer les éventuelles données invalides
        if (resp.results && Array.isArray(resp.results)) {
          this.paiements = resp.results.filter(p => p && p.montant > 0);
        } else {
          this.paiements = [];
        }

        const total = this.paiements.reduce((sum, p) => sum + (p.montant || 0), 0);
        this.detteDetail.montantPaye = total;
        this.detteDetail.montantRestant = Math.max(0, +(this.detteDetail.montantDette - total).toFixed(2));
        this.loading = false;
        this.loadingPaiements = false;
      },
      error: () => {
        this.paiements = [];
        this.loading = false;
        this.loadingPaiements = false;
      }
    });
  }

  get progressPercentage(): number {
    if (this.detteDetail.montantDette === 0) return 0;
    return Math.min(100, (this.detteDetail.montantPaye / this.detteDetail.montantDette) * 100);
  }

  get isFullyPaid(): boolean {
    return this.detteDetail.montantRestant === 0;
  }

  openPaiementForm(): void {
    this.showPaiementForm = true;
    this.paiementError = '';
    this.paiementSuccess = '';
    // Définir la date par défaut à aujourd'hui
    const today = new Date().toISOString().split('T')[0];
    this.nouveauPaiement = { montant: null, date: today };
  }

  closePaiementForm(): void {
    this.showPaiementForm = false;
    this.nouveauPaiement = { montant: null, date: '' };
    this.paiementError = '';
  }

  ajouterPaiement(): void {
    this.paiementError = '';
    this.paiementSuccess = '';

    if (!this.nouveauPaiement.montant || this.nouveauPaiement.montant < 1) {
      this.paiementError = "Le montant du paiement doit être positif.";
      return;
    }
    if (this.nouveauPaiement.montant > this.detteDetail.montantRestant) {
      this.paiementError = `Le montant dépasse le restant dû (${this.detteDetail.montantRestant.toFixed(2)} €).`;
      return;
    }
    if (!this.nouveauPaiement.date) {
      this.paiementError = "La date du paiement est obligatoire.";
      return;
    }

    this.submitting = true;
    const paiement: Omit<Paiement, 'id'> = {
      date: this.nouveauPaiement.date,
      montant: this.nouveauPaiement.montant!,
      clientId: this.detteDetail.clientId,
      detteId: this.detteDetail.id
    };

    this.paiementService.create(paiement).subscribe({
      next: () => {
        // Mettre à jour la dette
        const nouveauMontantPaye = this.detteDetail.montantPaye + this.nouveauPaiement.montant!;
        this.detteService.updateMontants(
          this.detteDetail.id,
          this.detteDetail.montantDette,
          nouveauMontantPaye
        ).subscribe({
          next: () => {
            this.paiementSuccess = 'Paiement ajouté avec succès !';
            this.submitting = false;
            this.closePaiementForm();
            this.loadPaiements();

            // Faire disparaître le message de succès après 3 secondes
            setTimeout(() => {
              this.paiementSuccess = '';
            }, 3000);
          },
          error: () => {
            this.paiementError = "Paiement ajouté, mais erreur lors de la mise à jour de la dette.";
            this.submitting = false;
            this.loadPaiements();
          }
        });
      },
      error: () => {
        this.paiementError = "Erreur lors de l'ajout du paiement.";
        this.submitting = false;
      }
    });
  }

  deletePaiement(paiement: Paiement): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ce paiement de ${paiement.montant} € ?`)) {
      this.paiementService.delete(paiement.id).subscribe({
        next: () => {
          // Mettre à jour la dette
          const nouveauMontantPaye = Math.max(0, this.detteDetail.montantPaye - paiement.montant);
          this.detteService.updateMontants(
            this.detteDetail.id,
            this.detteDetail.montantDette,
            nouveauMontantPaye
          ).subscribe({
            next: () => {
              this.paiementSuccess = 'Paiement supprimé avec succès.';
              this.loadPaiements();
              setTimeout(() => {
                this.paiementSuccess = '';
              }, 3000);
            },
            error: () => {
              alert("Paiement supprimé, mais erreur lors de la mise à jour de la dette.");
              this.loadPaiements();
            }
          });
        },
        error: () => alert('Erreur lors de la suppression du paiement.')
      });
    }
  }

  goBackToDettes() {
    this.router.navigate([ROUTES.DETTE.LIST]);
  }
}
