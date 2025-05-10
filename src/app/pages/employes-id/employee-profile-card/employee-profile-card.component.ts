import { CommonModule, CurrencyPipe, NgClass, NgSwitch } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Employe } from '../../../shared/models/employe.model';
import { PayItemComponent } from "./pay-item/pay-item.component";

@Component({
  selector: 'app-employee-profile-card',
  imports: [NgClass, NgSwitch, CurrencyPipe, CommonModule, PayItemComponent],
  templateUrl: './employee-profile-card.component.html',
  styleUrl: './employee-profile-card.component.css'
})
export class EmployeeProfileCardComponent {

  @Input() employee?: Employe;
  @Input() payHistory: PayHistory[] = [
    { month: 'Janvier', generatedDate: '2025-01-01', amount: 1200, status: 'Payé' },
    { month: 'Février', generatedDate: '2025-02-01', amount: 1100, status: 'Traité' },
    { month: 'Mars', generatedDate: '2025-03-01', amount: 1000, status: 'En attente' }
  ];

  activeTab: string = 'bulletins';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}


export interface PayHistory {
  month: string;
  generatedDate: string;
  amount: number;
  status: 'Payé' | 'Traité' | 'En attente'; // Exemple de valeurs possibles pour le statut
}