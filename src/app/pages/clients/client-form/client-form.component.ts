import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientService} from '../../../shared/services/impl/client.service';
import {Router} from '@angular/router';
import {RequestResponse} from '../../../shared/models/request.response.model';
import {Client} from '../../../shared/models/client_model';
import {ROUTES} from '../../../routing/app.paths';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-client-form',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  clientForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    this.clientForm = this.createForm();
  }

  ngOnInit(): void {}

  private createForm(): FormGroup {
    return this.formBuilder.group({
      nom: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        this.noWhitespaceValidator
      ]],
      telephone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9+\-\s()\.]+$/),
        Validators.minLength(8),
        Validators.maxLength(20)
      ]],
      adresse: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
        this.noWhitespaceValidator
      ]]
    });
  }

  // Validateur personnalisé pour éviter les espaces uniquement
  private noWhitespaceValidator(control: AbstractControl): {[key: string]: any} | null {
    if (control.value && control.value.trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.submitForm();
    } else {
      this.markFormGroupTouched();
      this.error = 'Veuillez corriger les erreurs dans le formulaire';
    }
  }

  private submitForm(): void {
    this.loading = true;
    this.error = null;
    this.success = null;

    // Nettoyer les données avant envoi
    const formData = this.clientForm.value;
    const clientData: Partial<Client> = {
      id: this.generateClientId(),
      nom: formData.nom.trim(),
      telephone: formData.telephone.trim(),
      adresse: formData.adresse.trim()
    };

    this.clientService.create(clientData).subscribe({
      next: (response: RequestResponse) => {
        if (response.status === 201 || response.status === 200) {
          this.success = 'Client créé avec succès!';

          // Redirection après 2 secondes
          setTimeout(() => {
            this.router.navigate([ROUTES.CLIENT.LIST]);
          }, 2000);
        } else {
          this.error = response.type || 'Erreur lors de la création du client';
          this.loading = false;
        }
      },
      error: (error) => {
        this.handleError(error);
      }
    });
  }

  private handleError(error: any): void {
    console.error('Erreur lors de la création:', error);

    if (error.status === 409) {
      this.error = 'Un client avec ce téléphone existe déjà';
    } else if (error.status === 400) {
      this.error = 'Données invalides. Veuillez vérifier les informations saisies';
    } else if (error.status === 0) {
      this.error = 'Impossible de joindre le serveur. Vérifiez votre connexion';
    } else {
      this.error = 'Erreur lors de la création du client. Veuillez réessayer';
    }

    this.loading = false;
  }

  generateClientId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `c${timestamp}${random}`;
  }

  markFormGroupTouched(): void {
    Object.keys(this.clientForm.controls).forEach(key => {
      const control = this.clientForm.get(key);
      control?.markAsTouched();
    });
  }

  goBack(): void {
    if (this.clientForm.dirty && !this.success) {
      if (confirm('Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?')) {
        this.router.navigate([ROUTES.CLIENT.LIST]);
      }
    } else {
      this.router.navigate([ROUTES.CLIENT.LIST]);
    }
  }

  resetForm(): void {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser le formulaire ?')) {
      this.clientForm.reset();
      this.error = null;
      this.success = null;

      // Remettre le focus sur le premier champ
      setTimeout(() => {
        const firstInput = document.getElementById('nom');
        if (firstInput) {
          firstInput.focus();
        }
      }, 100);
    }
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get nom(): AbstractControl | null {
    return this.clientForm.get('nom');
  }

  get telephone(): AbstractControl | null {
    return this.clientForm.get('telephone');
  }

  get adresse(): AbstractControl | null {
    return this.clientForm.get('adresse');
  }

  // Méthodes d'aide pour la validation dans le template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.clientForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.clientForm.get(fieldName);
    return !!(field && field.valid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.clientForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} est requis`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} doit contenir au moins ${field.errors['minlength'].requiredLength} caractères`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} ne peut pas dépasser ${field.errors['maxlength'].requiredLength} caractères`;
      }
      if (field.errors['pattern']) {
        return 'Format invalide';
      }
      if (field.errors['whitespace']) {
        return `${this.getFieldLabel(fieldName)} ne peut pas contenir que des espaces`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: {[key: string]: string} = {
      'nom': 'Le nom',
      'telephone': 'Le téléphone',
      'adresse': 'L\'adresse'
    };
    return labels[fieldName] || 'Ce champ';
  }

  // Méthode pour formater le téléphone automatiquement (optionnel)
  onPhoneInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      // Format français : 01 23 45 67 89
      if (value.startsWith('33')) {
        value = '+' + value;
      } else if (value.length === 10 && value.startsWith('0')) {
        value = value.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
      }
    }
    this.clientForm.patchValue({ telephone: value });
  }
}
