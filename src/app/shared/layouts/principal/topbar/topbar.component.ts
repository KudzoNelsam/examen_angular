import { Component, EventEmitter, Output } from '@angular/core';
import { PeriodeBulletinResponse } from '../../../models/layout.model';
import { LayoutService } from '../../../services/impl/layout.service';
import { RequestResponse } from '../../../models/request.response.model';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  periode?: PeriodeBulletinResponse;
  constructor(private layoutService: LayoutService) {
  }
  ngOnInit() {
    this.layoutService.getPeriode().subscribe({
      next : (data: RequestResponse) => {
        this.periode = data.results;
      },
      error : (error) => {
        console.error('Error fetching period:', error);
      }
    })
  }
}
