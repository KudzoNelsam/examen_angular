import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { ROUTES } from '../../../routing/app.paths';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeWithDatas } from '../../../shared/models/employe.model';
import { EmployeService } from '../../../shared/services/impl/employe.service';
import { LayoutService } from '../../../shared/services/impl/layout.service';
import { PeriodeBulletinResponse } from '../../../shared/models/layout.model';
import { BulletinItemComponent } from "../../bulletin/components/bulletin-item/bulletin-item.component";
import { RemunerationItemComponent } from "../../remuneration/components/remuneration-item/remuneration-item.component";
import { NotifComponent } from "../../../shared/components/notif/notif.component";

@Component({
  selector: 'app-employe-details',
  imports: [NgSwitch, NgSwitchCase, NgIf, RouterModule, BulletinItemComponent, RemunerationItemComponent, NotifComponent],
  templateUrl: './employe-details.component.html',
  styleUrl: './employe-details.component.css'
})
export class EmployeDetailsComponent {
  notif: boolean = false;
  notifContent: string = '';
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
        this.activeTab = 'bulletins'
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

  showNotif(content: string) {
    this.notifContent = content;
    this.notif = true;
    setTimeout(() => {
      this.notif = false;
    }, 5000);
  }
}
