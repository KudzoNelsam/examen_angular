import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-etat-civil',
  imports: [],
  templateUrl: './etat-civil.component.html',
  styleUrl: './etat-civil.component.css'
})
export class EtatCivilComponent implements OnInit {

  form!: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      matricule: ['', Validators.required],
      badge: [''],
      codeConf: ['0'],
      civilite: ['Monsieur'],
      nom: ['', Validators.required],
      nomFamille: [''],
      prenom1: ['', Validators.required],
      prenom2: [''],
      prenom3: [''],
      situationFamiliale: ['Célibataire'],
      nombreEnfants: [0],
      nonReconnu: [false],
      dateNaissance: ['', Validators.required],
      dateNaissanceType: ['0'],
    });
  }


}
