import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeRemunerationService } from '../../../../shared/services/impl/employe-remuneration.service';
import { EmployeRemuneration } from '../../../../shared/models/employe.remuneration.model';
import { NgFor, NgIf } from '@angular/common';
import { Remuneration } from '../../../../shared/models/remuneration.model';
import { SelectRenumerationComponent } from "../select-renumeration/select-renumeration.component";
import { SaisieMontantComponent } from "../saisie-montant/saisie-montant.component";
import { NotifComponent } from "../../../../shared/components/notif/notif.component";
import { EmployeRemunerationRequest } from '../../../../shared/models/requests/employe.remuneration.model';

@Component({
  selector: 'app-remuneration-item',
  imports: [NgFor, NgIf, SelectRenumerationComponent, SaisieMontantComponent],
  templateUrl: './remuneration-item.component.html',
  styleUrl: './remuneration-item.component.css'
})
export class RemunerationItemComponent {
  @Input({required : true}) remunerations?: EmployeRemuneration[];
  @Input({required : true}) employeId?: number;
  @Output() notif = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<void>();
  saisie: boolean = false;
  select: boolean = false;
  selectedRemuneration?: Remuneration;
  remunerationId? : number;

  constructor(private employeRemunerationService : EmployeRemunerationService) { }

  update(montant: number) {
    this.employeRemunerationService.updateRemuneration(this.remunerationId!,{montant : montant}).subscribe({
      next: (response) => {
        this.refresh.emit();
        this.notif.emit("Rémunération mise à jour avec succès ✔");
      },
      error: (error) => {
        console.error('Error updating remuneration:', error);
      }
    });
  }
  remove(remunerationId: number) {
    if (confirm('Are you sure you want to remove this remuneration?')) {
      this.employeRemunerationService.delete(remunerationId).subscribe({
        next: (response) => {
          this.refresh.emit();
          this.notif.emit("Remuneration suprimé avec succès ✔");
        },
        error: (error) => {
          console.error('Error deleting remuneration:', error);
        }
      });
    }
  }
  selectRemuneration(){
    this.remunerationId = undefined;
    this.select = true;
  }
  showSaisie(remuneration: Remuneration) {
    if (remuneration) {
      this.selectedRemuneration = remuneration;
      this.hideSelect();
      this.saisirMontant(remuneration.id)
      return;
    }
    this.hideSelect();
    this.notif.emit("Veuillez d'abord sélectionner une rémunération");
  }

  modifier(id : number){
    this.selectedRemuneration = undefined;
    this.saisirMontant(id);
  }
  saisirMontant(id : number) {
    this.saisie = true;
    this.remunerationId = id;
  }
  hideSelect() {
    this.remunerationId = undefined;
    this.select = false;
  }
  hideSaisie() {
    // this.selectedRemuneration = undefined;
    this.saisie = false;
  }
  addRemuneration(montant: string) {
    this.hideSaisie();
    if (!isNaN(Number(montant))) {
      if (Number(montant) <= 0) {
        this.notif.emit("Veuillez entrer un montant positif");
        return;
      }
      if (this.selectedRemuneration === undefined) {
        this.update(Number(montant));
        return;
      }
      const employeRemuneration: EmployeRemunerationRequest = {
        remunerationId: this.selectedRemuneration?.id!,
        montant: Number(montant),
        employeId: this.employeId!
      };
      this.employeRemunerationService.addToEmploye(employeRemuneration).subscribe({
        next: (response) => {
          this.refresh.emit();
          this.notif.emit("Rémunération ajoutée avec succès ✔");
        },
        error: (error) => {
          console.error('Error adding remuneration:', error);
        }
      });
    } else {
      this.notif.emit("Veuillez entrer un montant valide");
    }
  }
}
