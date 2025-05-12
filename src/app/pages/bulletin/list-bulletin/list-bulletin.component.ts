import { Component } from '@angular/core';
import { Pagination } from '../../../shared/models/pagination.model';
import { RequestResponse } from '../../../shared/models/request.response.model';
import { BulletinService } from '../../../shared/services/impl/bulletin.service';
import { Bulletin } from '../../../shared/models/bulletin.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { BulletinItemComponent } from "../components/bulletin-item/bulletin-item.component";
import { NotifComponent } from "../../../shared/components/notif/notif.component";
import { EmployeService } from '../../../shared/services/impl/employe.service';
import { PeriodeBulletinResponse } from '../../../shared/models/layout.model';
import { LayoutService } from '../../../shared/services/impl/layout.service';

@Component({
  selector: 'app-list-bulletin',
  imports: [FormsModule, NgIf, PaginationComponent, BulletinItemComponent, NotifComponent],
  templateUrl: './list-bulletin.component.html',
  styleUrl: './list-bulletin.component.css'
})
export class ListBulletinComponent {
  notif: boolean = false;
  notifContent: string = '';
  list?: Bulletin[];
  champ?: string;
  pagination?: Pagination;
  periode?: PeriodeBulletinResponse;
  

  constructor(private bulletinService: BulletinService, 
    private employeService : EmployeService,
    private layoutService : LayoutService) { }

  ngOnInit(): void {
    this.refresh();
    this.layoutService.getPeriode().subscribe({
      next: (data) => {
        this.periode = data.results;
      },
      error: (error) => {
        console.error('Error fetching period:', error);
      }
    });
  }

  generateAll() {
    alert("Cette action va générer tous les bulletins de la période en cours");
    this.showNotif("Bulletins en cours de génération ... ⏳");
    this.employeService.generateAll(this.periode?.id!).subscribe({
      next: (data) => {
        this.refresh();
        this.showNotif("Bulletins générés avec succès ✔");
      },
      error: (error) => {
        console.error('Error generating all bulletins:', error);
      }
    });
  }
  onSearch() {
    this.refresh();
  }
  onPageChange(page: number) {
    this.refresh(page);
  }

  refresh(page: number = 0) {
    this.bulletinService.filter(this.champ, page).subscribe({
      next: (data: RequestResponse) => {
        this.list = data.results;
        this.pagination = {
          currentPage: data.currentPage!,
          hasNextPage: data.hasNextPage!,
          hasPreviousPage: data.hasPreviousPage!,
          pages: data.pages!
        }
      },
      error: (error) => {
        console.error('Error refreshing employee list:', error);
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
