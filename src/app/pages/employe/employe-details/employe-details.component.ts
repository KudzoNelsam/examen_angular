import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { ROUTES } from '../../../routing/app.paths';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeWithDatas } from '../../../shared/models/employe.model';
import { EmployeService } from '../../../shared/services/impl/employe.service';
import { PeriodeBulletinResponse } from '../../../shared/models/layout.model';
import { BulletinItemComponent } from "../../bulletin/components/bulletin-item/bulletin-item.component";
import { RemunerationItemComponent } from "../../remuneration/components/remuneration-item/remuneration-item.component";
import { NotifComponent } from "../../../shared/components/notif/notif.component";
import { PopupComponent } from "../../bulletin/components/popup/popup.component";

@Component({
  selector: 'app-employe-details',
  imports: [NgSwitch, NgSwitchCase, NgIf, RouterModule, BulletinItemComponent, RemunerationItemComponent, NotifComponent, PopupComponent],
  templateUrl: './employe-details.component.html',
  styleUrl: './employe-details.component.css'
})
export class EmployeDetailsComponent {
  notif: boolean = false;
  popup: boolean = false;
  notifContent: string = '';
  routes = ROUTES
  activeTab: string = 'bulletins';
  employe? : EmployeWithDatas;

  constructor(private employeService : EmployeService, private activatedRoute : ActivatedRoute) {}

  ngOnInit() {
    const employeId = this.activatedRoute.snapshot.params['id'];
    this.refresh(employeId);
  }
  showPopup() {
    this.popup = true;
  }
  hidePopup() {
    this.popup = false;
  }

  generateBulletin(periode : PeriodeBulletinResponse) {
    this.hidePopup();
    if (periode) {
      this.showNotif(`Bulletin de ${periode.mois} en cours de génération ... ⏳`);
      this.employeService.generateBulletin(this.employe!.employe.id,periode.id).subscribe({
        next: (data) => {
          this.refresh();
          this.activeTab = 'bulletins'
          this.showNotif("Bulletin généré avec succès ✔");
        },
        error: (error) => {
          console.error('Error generating bulletin:', error);
        }
      });
    }else {
      this.showNotif("Aucune période sélectionnée ❌");
    }
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
