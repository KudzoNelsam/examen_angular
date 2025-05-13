import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  imports: [],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css'
})
export class DashboardCardComponent {
  @Input({required : true}) title!: string;
  @Input({required : true}) value!: string;
  @Input({required : true}) subtitle?: string;
  @Input({required : true}) icon?: string;
}
