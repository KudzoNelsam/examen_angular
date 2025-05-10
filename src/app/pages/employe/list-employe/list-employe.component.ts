import { Component } from '@angular/core';
import { EmployeeCardComponent } from "../components/employee-card/employee-card.component";
import { Employe } from '../../../shared/models/employe.model';
import { NgFor } from '@angular/common';
import { EmployeService } from '../../../shared/services/impl/employe.service';
import { RequestResponse } from '../../../shared/models/request.response.model';
import { ListEmploye } from '../../../shared/models/list.employe.model';

@Component({
  selector: 'app-list-employe',
  imports: [EmployeeCardComponent, NgFor],
  templateUrl: './list-employe.component.html',
  styleUrl: './list-employe.component.css'
})
export class ListEmployeComponent {
  list? : ListEmploye;

  constructor(private employeService: EmployeService) { }

  ngOnInit(): void {
    this.employeService.getAll(12).subscribe(
      (data: RequestResponse) => {
        this.list = data.results;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
