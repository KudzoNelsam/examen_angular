import { Component } from '@angular/core';
import { EtatCivilComponent } from "./etat-civil/etat-civil.component";
import { CoordonneesComponent } from "./coordonnees/coordonnees.component";
import { ContratComponent } from "./contrat/contrat.component";
import { PosteComponent } from "./poste/poste.component";
import { PaieComponent } from "./paie/paie.component";
import { PrelevementComponent } from "./prelevement/prelevement.component";
import { ContratsSociauxComponent } from "./contrats-sociaux/contrats-sociaux.component";
import { CongesComponent } from "./conges/conges.component";
import { EmploisOccupesComponent } from "./emplois-occupes/emplois-occupes.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-formulaire-rh',
  imports: [EtatCivilComponent, CoordonneesComponent, ContratComponent, PosteComponent, PaieComponent, PrelevementComponent, ContratsSociauxComponent, CongesComponent, EmploisOccupesComponent, NgFor, NgIf],
  templateUrl: './formulaire-rh.component.html',
  styleUrl: './formulaire-rh.component.css'
})
export class FormulaireRhComponent {

  step = 0;
  tabs = [
    'État Civil',
    'Coordonnées',
    'Contrat',
    'Poste',
    'Paie',
    'Prélèvement à la source',
    'Congés',
    'Contrats sociaux',
    'Emplois occupés'
  ];

  next() {
    if (this.step < this.tabs.length - 1) this.step++;
  }

  prev() {
    if (this.step > 0) this.step--;
  }

  goToStep(index: number) {
    this.step = index;
  }
}
