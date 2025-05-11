import { Component, OnInit } from '@angular/core';
import { Bulletin, Employe } from '../../shared/models/employe.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeService } from '../../shared/services/impl/employe.service';
import { EmployeeProfileCardComponent } from "./employee-profile-card/employee-profile-card.component";

@Component({
  selector: 'app-employes-id',
  imports: [RouterModule,
    EmployeeProfileCardComponent],
  templateUrl: './employes-id.component.html',
  styleUrl: './employes-id.component.css'
})
export class EmployesIdComponent implements OnInit {

  employeActif?: Employe;
  bulletins: Bulletin[] = [];



  // Logic for the employee details page
  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly employeService: EmployeService
  ) {
    // Constructor logic if needed
  }

  ngOnInit() {
    // Logic to fetch and display employee details
    const employeId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Employee details page initialized with ID:', employeId);

    if (employeId) {
      this.employeService.getWithBulletins(Number(employeId)).subscribe({
        next: data => {
          this.employeActif = data.results.employee;
          this.bulletins = data.results.bulletins;
          console.log('Employee details fetched:', data);
        },
        error: error => {
          console.error('Error fetching employee details:', error);
        }
      });
    }
  }

}
