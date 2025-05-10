import { Component, Input } from '@angular/core';
import { PayHistory } from '../employee-profile-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pay-item',
  imports: [CommonModule],
  templateUrl: './pay-item.component.html',
  styleUrl: './pay-item.component.css'
})
export class PayItemComponent {
  onDownloadPayslip() {
    // Logic to download the payslip
    console.log('Downloading payslip for:', this.pay);
  }
  @Input() pay?: PayHistory;

}
