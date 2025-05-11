import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeRemunerationService } from '../../../../shared/services/impl/employe-remuneration.service';
import { EmployeRemuneration } from '../../../../shared/models/employe.remuneration.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-remuneration-item',
  imports: [NgFor, NgIf],
  templateUrl: './remuneration-item.component.html',
  styleUrl: './remuneration-item.component.css'
})
export class RemunerationItemComponent {
  @Input() remunerations?: EmployeRemuneration[];
  @Output() notif = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<void>();

  constructor(private employeRemunerationService : EmployeRemunerationService) { }

  remove(remunerationId: number) {
    if (confirm('Are you sure you want to remove this remuneration?')) {
      this.employeRemunerationService.delete(remunerationId).subscribe({
        next: (response) => {
          this.refresh.emit();
          this.notif.emit("Remuneration suprimé avec succès ✔");
        },
        error: (error) => {
          console.error('Error deleting remuneration:', error);
        }
      });
    }
  }
  addRemuneration() {
  }
}
