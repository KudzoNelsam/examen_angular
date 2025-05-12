import { Component } from '@angular/core';
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

  constructor(private readonly employeService: EmployeService) { }

  ngOnInit(): void {
    this.refresh();
  }
  onSearch() {
    this.refresh();
  }
  onPageChange(page: number) {
    this.refresh(page);
  }

  refresh(page: number = 0) {
    this.employeService.filter(this.champ, this.statut, this.departementId, page).subscribe({
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
