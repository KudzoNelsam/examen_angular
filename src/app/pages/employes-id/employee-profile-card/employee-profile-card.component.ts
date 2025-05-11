import { CommonModule, CurrencyPipe, NgClass, NgSwitch } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Bulletin, Employe } from '../../../shared/models/employe.model';
import { EmployeService } from '../../../shared/services/impl/employe.service';
import { BulletinService } from '../../../shared/services/impl/bulletin.service';

@Component({
  selector: 'app-employee-profile-card',
  imports: [NgClass, NgSwitch, CurrencyPipe, CommonModule],
  templateUrl: './employee-profile-card.component.html',
  styleUrl: './employee-profile-card.component.css'
})
export class EmployeeProfileCardComponent {
  constructor(private readonly employeService: EmployeService,
    private readonly bulletinService: BulletinService
  ) {
    // Constructor logic if needed
  }

  sendBulletin() {
    // Logic to send the bulletin
    console.log('Sending bulletin...');

  }
  openBulletin(bulletin: Bulletin) {
    console.log('Opening bulletin:', bulletin);
    this.bulletinService.download(bulletin.id).subscribe({
      next: (data) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bulletin-${bulletin.employeNom}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error: (error) => {
        console.error('Error fetching bulletin PDF:', error);
      }
    });


    // Logic to open the bulletin details
    console.log('Opening bulletin:', bulletin);
  }



  @Input() employee?: Employe;
  activeTab: string = 'bulletins';
  @Input() payHistory: Bulletin[] = [

  ];



  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}




