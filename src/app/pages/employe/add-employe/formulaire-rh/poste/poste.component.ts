import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-poste',
  imports: [ReactiveFormsModule],
  templateUrl: './poste.component.html',
  styleUrl: './poste.component.css'
})
export class PosteComponent {

  posteForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.posteForm = this.fb.group({
      intitulePoste: [''],
      departement: [''],
      service: [''],
      hierarchie: [''],
      lieuTravail: [''],
      codePoste: [''],
      description: [''],
    });
  }

}
