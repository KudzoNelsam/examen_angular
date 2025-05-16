import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-paie',
  imports: [ReactiveFormsModule],
  templateUrl: './paie.component.html',
  styleUrl: './paie.component.css'
})
export class PaieComponent implements OnInit {

  paieForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.paieForm = this.fb.group({
      matriculePaie: [''],
      banque: [''],
      numeroCompte: [''],
      modePaiement: ['Virement'],
      devise: ['XOF'],
      salaireBase: [''],
      avantagesNature: [''],
      elementsVariables: [''],
    });
  }

}
