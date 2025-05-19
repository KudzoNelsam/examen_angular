import { Component } from '@angular/core';
import { DashboardCardComponent } from "./dashboard-card/dashboard-card.component";
import { Dashboard } from '../../shared/models/dashboard.model';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../shared/services/impl/dashboard.service';
import { BulletinItemComponent } from "../bulletin/components/bulletin-item/bulletin-item.component";
import { Pagination } from '../../shared/models/pagination.model';
import { NgIf } from '@angular/common';
import { NotifComponent } from "../../shared/components/notif/notif.component";
import { DashboardGraphComponent } from "./dashboard-graph/dashboard-graph.component";
import { BulletinService } from '../../shared/services/impl/bulletin.service';
import { EmployeService } from '../../shared/services/impl/employe.service';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardCardComponent, FormsModule, BulletinItemComponent, NgIf, NotifComponent, DashboardGraphComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  departementId?: number ;
  periodeId?: number;
  dashboard? : Dashboard;
  pagination?: Pagination;
  notif: boolean = false;
  notifContent: string = '';

  constructor(private dashboardService : DashboardService, 
    private bulletinService : BulletinService,
    private employeService : EmployeService) {}
  ngOnInit() {
    this.refresh();
  }
  refresh(page: number = 0) {
    this.dashboardService.getSummary(this.departementId!, this.periodeId!,page).subscribe({
      next: (data) => {
        this.dashboard = data.results;
        this.periodeId = data.results.periodeSelectionee.id;
        this.pagination = {
          currentPage: data.currentPage!,
          hasNextPage: data.hasNextPage!,
          hasPreviousPage: data.hasPreviousPage!,
          pages: data.pages!
        }
      },
      error: (error) => {
        console.error('Error fetching dashboard:', error);
      }
    });
  }
  onSearch(){
    this.refresh();
  }
  onPageChange(page: number) {
    this.refresh(page);
  }

  generateBulletin() {
    this.showNotif("Génération en cours...");
    this.employeService.generateAll(this.periodeId!, this.departementId).subscribe({
      next: (data) => {
        this.refresh();
        this.showNotif("Bulletins générés avec succès ✔");
      },
      error: (error) => {
        console.error('Error generating all bulletins:', error);
        this.showNotif("Error generating bulletin");
      }
    });
  }
  sendBulletin() {
    this.showNotif("Envoi en cours...");
    this.bulletinService.sendAllMail(this.periodeId!, this.departementId).subscribe({
      next: (data) => {
        this.refresh();
        this.showNotif("Bulletins envoyés avec succès ✔");
      },
      error: (error) => {
        console.error('Error sending all bulletins:', error);
        this.showNotif("Error sending bulletin");
      }
    });
    
  }
  downloadBulletin() {
    this.showNotif("Bulletins en cours de téléchargement...");
    this.bulletinService.downloadAll(this.periodeId!, this.departementId).subscribe({
      next: (data) => {
        const blob = new Blob([data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bulletins.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error fetching bulletin PDF:', error);
      }
    });
  }
  showNotif(content: string) {
    this.notifContent = content;
    this.notif = true;
    setTimeout(() => {
      this.notif = false;
    }, 5000);
  }
}
