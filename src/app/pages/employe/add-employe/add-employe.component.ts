import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormulaireRhComponent } from "./formulaire-rh/formulaire-rh.component";

@Component({
  selector: 'app-add-employe',
  imports: [ReactiveFormsModule, FormulaireRhComponent],
  templateUrl: './add-employe.component.html',
  styleUrl: './add-employe.component.css'
})
export class AddEmployeComponent {

  step: number = 1;
  totalStep: number = 5;

  nextStep() {
    this.step++;
  }

  previousStep() {
    this.step--;
  }

  onSubmit() {



    throw new Error('Method not implemented.');


  }





  loginForm = new FormGroup({


    email: new FormControl('', [Validators.required, Validators.email]),


    password: new FormControl('', Validators.required),


    firstName: new FormControl('', Validators.required),


    lastName: new FormControl('', Validators.required)


  });

}
