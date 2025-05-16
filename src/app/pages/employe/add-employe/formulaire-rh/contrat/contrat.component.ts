import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contrat',
  imports: [ReactiveFormsModule],
  templateUrl: './contrat.component.html',
  styleUrl: './contrat.component.css'
})
export class ContratComponent implements OnInit {
  contratForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contratForm = this.fb.group({
      typeContrat: [''],
      categorieProfessionnelle: [''],
      dateDebut: [''],
      dateFin: [''],
      statut: [''],
      motif: [''],
      observations: ['']
    });
  }

  submit(): void {
    if (this.contratForm.valid) {
      console.log('Contrat soumis :', this.contratForm.value);
    } else {
      console.warn('Formulaire contrat invalide');
    }
  }
}
