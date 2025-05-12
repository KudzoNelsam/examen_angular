import { Component, EventEmitter, Output } from '@angular/core';
import { PeriodeBulletinResponse } from '../../../models/layout.model';
import { PeriodeService } from '../../../services/impl/periode.service';
import { RequestResponse } from '../../../models/request.response.model';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  periode?: PeriodeBulletinResponse;
  constructor(private periodeService: PeriodeService) {
  }
  ngOnInit() {
    this.periodeService.getActualPeriode().subscribe({
      next : (data: RequestResponse) => {
        this.periode = data.results;
      },
      error : (error) => {
        console.error('Error fetching period:', error);
      }
    })
  }
}
