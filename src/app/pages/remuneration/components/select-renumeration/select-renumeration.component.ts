import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Remuneration } from '../../../../shared/models/remuneration.model';
import { RemunerationService } from '../../../../shared/services/impl/remuneration.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-select-renumeration',
  imports: [FormsModule, NgFor],
  templateUrl: './select-renumeration.component.html',
  styleUrl: './select-renumeration.component.css'
})
export class SelectRenumerationComponent {
  @Input({required : true}) employeId?: number;
  @Output() hide: EventEmitter<void> = new EventEmitter<void>();
  @Output() selected: EventEmitter<Remuneration> = new EventEmitter<Remuneration>();
  remuneration?: Remuneration;
  remunerations : Remuneration[] = [];

  constructor(private remunerationService : RemunerationService) {}

  ngOnInit() {
    this.remunerationService.getRemunerationsNonAssociees(this.employeId!).subscribe({
      next: (data) => {
        this.remunerations = data.results;
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
    this.selected.emit(this.remuneration);
  }
}
