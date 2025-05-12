import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeriodeService } from '../../../../shared/services/impl/periode.service';
import { PeriodeBulletinResponse } from '../../../../shared/models/layout.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-popup',
  imports: [FormsModule, NgFor],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Output() hide: EventEmitter<void> = new EventEmitter<void>();
  @Output() selected: EventEmitter<PeriodeBulletinResponse> = new EventEmitter<PeriodeBulletinResponse>();
  periode?: PeriodeBulletinResponse;
  periodes : PeriodeBulletinResponse[] = [];

  constructor(private periodeService : PeriodeService) {}

  ngOnInit() {
    this.periodeService.getAll().subscribe({
      next: (data) => {
        this.periodes = data.results;
      },
      error: (error) => {
        console.error('Error fetching period:', error);
      }
    });
  }

  hidePopup() {
    this.hide.emit();
  }
  validate() {
    this.selected.emit(this.periode);
  }
}
