import { Component, NgModule } from '@angular/core';
import { EmployeeCardComponent } from "../components/employee-card/employee-card.component";
import { NgFor, NgIf } from '@angular/common';
import { EmployeService } from '../../../shared/services/impl/employe.service';
import { RequestResponse } from '../../../shared/models/request.response.model';
import { ListEmploye } from '../../../shared/models/list.employe.model';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { Pagination } from '../../../shared/models/pagination.model';


@Component({
  selector: 'app-list-employe',
  imports: [EmployeeCardComponent, NgFor, NgIf, FormsModule, PaginationComponent],
  templateUrl: './list-employe.component.html',
  styleUrl: './list-employe.component.css'
})
export class ListEmployeComponent {
  list?: ListEmploye;
  champ?: string;
  departementId?: number;
  statut?: string;
  pagination?: Pagination;

  constructor(private employeService: EmployeService) { }

  ngOnInit(): void {
    this.onRefresh();
  }
  onSearch() {
    this.employeService.filter(this.champ, this.statut, this.departementId).subscribe({
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
  onPageChange(page: number) {
    this.onRefresh(page);
  }

  onRefresh(page: number = 0) {
    this.employeService.getAll(page).subscribe({
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
}
