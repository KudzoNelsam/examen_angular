import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-prelevement',
  imports: [ReactiveFormsModule],
  templateUrl: './prelevement.component.html',
  styleUrl: './prelevement.component.css'
})
export class PrelevementComponent implements OnInit {

  prelevementForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.prelevementForm = this.fb.group({
      typePrelevement: ['IPRES', Validators.required],
      montant: [null, [Validators.required, Validators.min(0)]],
      devise: ['XOF', Validators.required],
      taux: [null, [Validators.min(0), Validators.max(100)]],
      dateDebut: ['', Validators.required],
      commentaire: [''],
    });
  }

}
