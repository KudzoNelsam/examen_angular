import { NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { ROUTES } from '../../../routing/app.paths';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeWithDatas } from '../../../shared/models/employe.model';
import { EmployeService } from '../../../shared/services/impl/employe.service';
import { LayoutService } from '../../../shared/services/impl/layout.service';
import { PeriodeBulletinResponse } from '../../../shared/models/layout.model';
import { BulletinItemComponent } from "../../bulletin/components/bulletin-item/bulletin-item.component";

@Component({
  selector: 'app-employe-details',
  imports: [NgSwitch, NgSwitchCase, NgFor, RouterModule, BulletinItemComponent],
  templateUrl: './employe-details.component.html',
  styleUrl: './employe-details.component.css'
})
export class EmployeDetailsComponent {
  periode?: PeriodeBulletinResponse;
  routes = ROUTES
  activeTab: string = 'bulletins';
  employe? : EmployeWithDatas;

  constructor(private employeService : EmployeService, private activatedRoute : ActivatedRoute, private layoutservice : LayoutService) {}

  ngOnInit() {
    const employeId = this.activatedRoute.snapshot.params['id'];
    this.refresh(employeId);
    this.layoutservice.getPeriode().subscribe({
      next: (data) => {
        this.periode = data.results;
      },
      error: (error) => {
        console.error('Error fetching period:', error);
      }
    });
  }

  generateBulletin(id: number = this.periode?.id!) {
    this.employeService.generateBulletin(this.employe!.employe.id,id).subscribe({
      next: (data) => {
        this.refresh();
      },
      error: (error) => {
        console.error('Error generating bulletin:', error);
      }
    });
  }

  refresh(id : number = this.employe!.employe.id) {
    this.employeService.getWithDatas(id).subscribe({
      next: (data) => {
        this.employe = data.results;
      },
      error: (error) => {
        console.error('Error refreshing employee details:', error);
      }
    });
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    this.refresh();
  }
}
