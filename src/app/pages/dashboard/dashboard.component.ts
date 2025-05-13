import { Component } from '@angular/core';
import { DashboardCardComponent } from "./dashboard-card/dashboard-card.component";
import { Dashboard } from '../../shared/models/dashboard.model';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../shared/services/impl/dashboard.service';
import { BulletinItemComponent } from "../bulletin/components/bulletin-item/bulletin-item.component";
import { Pagination } from '../../shared/models/pagination.model';
import { NgIf } from '@angular/common';
import { NotifComponent } from "../../shared/components/notif/notif.component";

@Component({
  selector: 'app-dashboard',
  imports: [DashboardCardComponent, FormsModule, BulletinItemComponent, NgIf, NotifComponent],
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



  constructor(private dashboardService : DashboardService) {}
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

  showNotif(content: string) {
    this.notifContent = content;
    this.notif = true;
    setTimeout(() => {
      this.notif = false;
    }, 5000);
  }
}
