import { Component, Input } from '@angular/core';
import { Employe } from '../../../../shared/models/employe.model';
import { Router } from '@angular/router';
import { ROUTES } from '../../../../routing/app.paths';

@Component({
  selector: 'app-employee-card',
  imports: [],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {

  @Input() employe?: Employe
  constructor(private readonly router: Router) {
    // Constructor logic if needed
  }

  public openDetails() {
    this.router.navigateByUrl(ROUTES.EMPLOYE.DETAIL(this.employe?.id ?? 0));
  }
}
