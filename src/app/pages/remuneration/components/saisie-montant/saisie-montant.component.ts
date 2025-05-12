import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-saisie-montant',
  imports: [FormsModule],
  templateUrl: './saisie-montant.component.html',
  styleUrl: './saisie-montant.component.css'
})
export class SaisieMontantComponent {
  @Output() hide: EventEmitter<void> = new EventEmitter<void>();
  @Output() add: EventEmitter<string> = new EventEmitter<string>();
  montant?: string;

  hidePopup() {
    this.hide.emit();
  }
  validate() {
    this.add.emit(this.montant);
  }
}
