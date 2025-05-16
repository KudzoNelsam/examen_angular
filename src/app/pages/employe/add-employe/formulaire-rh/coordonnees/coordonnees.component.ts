import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-coordonnees',
  imports: [ReactiveFormsModule],
  templateUrl: './coordonnees.component.html',
  styleUrl: './coordonnees.component.css'
})
export class CoordonneesComponent implements OnInit {


  coordonneesForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.coordonneesForm = this.fb.group({
      adresse: [''],
      complementAdresse: [''],
      codePostal: [''],
      ville: [''],
      region: [''],
      pays: ['Sénégal'],
      telephone: [''],
      telephone2: [''],
      emailPro: [''],
      emailPerso: ['']
    });
  }

  // Optionnel : méthode pour récupérer les valeurs à soumettre ou déboguer
  submit(): void {
    if (this.coordonneesForm.valid) {
      console.log('Données coordonnées :', this.coordonneesForm.value);
    } else {
      console.warn('Formulaire invalide');
    }
  }

}
