import { Component, NgModule } from '@angular/core';
import { EmployeeCardComponent } from "../components/employee-card/employee-card.component";
import { NgFor } from '@angular/common';
import { EmployeService } from '../../../shared/services/impl/employe.service';
import { RequestResponse } from '../../../shared/models/request.response.model';
import { ListEmploye } from '../../../shared/models/list.employe.model';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';


@Component({
  selector: 'app-list-employe',
  imports: [EmployeeCardComponent, NgFor, FormsModule, PaginationComponent],
  templateUrl: './list-employe.component.html',
  styleUrl: './list-employe.component.css'
})
export class ListEmployeComponent {
  list?: ListEmploye;
  champ?: string;
  departementId?: number;
  statut?: string;
  pages: number[] = [];

  constructor(private employeService: EmployeService) { }

  ngOnInit(): void {
    this.employeService.getAll().subscribe(
      (data: RequestResponse) => {
        this.list = data.results;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  onSearch() {
    this.employeService.filter(this.champ, this.statut, this.departementId).subscribe(
      data => {
        this.list = data.results;
      },
      error => {
        console.error('Error fetching data:', error);
      })
  }
}
