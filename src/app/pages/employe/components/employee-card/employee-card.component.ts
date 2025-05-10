import { Component, Input } from '@angular/core';
import { Employe } from '../../../../shared/models/employe.model';

@Component({
  selector: 'app-employee-card',
  imports: [],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {
  @Input() employe?: Employe
}
