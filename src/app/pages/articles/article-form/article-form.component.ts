import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ArticleService} from '../../../shared/services/impl/article.service';
import {Router} from '@angular/router';
import {RequestResponse} from '../../../shared/models/request.response.model';
import {ROUTES} from '../../../routing/app.paths';
import {Article} from '../../../shared/models/article_model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-article-form',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css'
})
export class ArticleFormComponent {
  articleForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ) {
    this.articleForm = this.createForm();
  }

  ngOnInit(): void {}

  private createForm(): FormGroup {
    return this.formBuilder.group({
      libelle: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        this.noWhitespaceValidator
      ]],
      prixVente: ['', [
        Validators.required,
        Validators.min(0.01),
        Validators.max(999999.99)
      ]],
      qteStock: ['', [
        Validators.required,
        Validators.min(0),
        Validators.max(999999)
      ]]
    });
  }

  private noWhitespaceValidator(control: AbstractControl): {[key: string]: any} | null {
    if (control.value && control.value.trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
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

    const formData = this.articleForm.value;
    const articleData: Partial<Article> = {
      id: this.generateArticleId(),
      libelle: formData.libelle.trim(),
      prixVente: parseFloat(formData.prixVente),
      qteStock: parseInt(formData.qteStock, 10)
    };

    this.articleService.create(articleData).subscribe({
      next: (response: RequestResponse) => {
        if (response.status === 201 || response.status === 200) {
          this.success = 'Article créé avec succès!';

          setTimeout(() => {
            this.router.navigate([ROUTES.ARTICLE.LIST]);
          }, 2000);
        } else {
          this.error = response.type || 'Erreur lors de la création de l\'article';
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
      this.error = 'Un article avec ce libellé existe déjà';
    } else if (error.status === 400) {
      this.error = 'Données invalides. Veuillez vérifier les informations saisies';
    } else if (error.status === 0) {
      this.error = 'Impossible de joindre le serveur. Vérifiez votre connexion';
    } else {
      this.error = 'Erreur lors de la création de l\'article. Veuillez réessayer';
    }

    this.loading = false;
  }

  generateArticleId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `a${timestamp}${random}`;
  }

  markFormGroupTouched(): void {
    Object.keys(this.articleForm.controls).forEach(key => {
      const control = this.articleForm.get(key);
      control?.markAsTouched();
    });
  }

  goBack(): void {
    if (this.articleForm.dirty && !this.success) {
      if (confirm('Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?')) {
        this.router.navigate([ROUTES.ARTICLE.LIST]);
      }
    } else {
      this.router.navigate([ROUTES.ARTICLE.LIST]);
    }
  }

  resetForm(): void {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser le formulaire ?')) {
      this.articleForm.reset();
      this.error = null;
      this.success = null;

      setTimeout(() => {
        const firstInput = document.getElementById('libelle');
        if (firstInput) {
          firstInput.focus();
        }
      }, 100);
    }
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get libelle(): AbstractControl | null {
    return this.articleForm.get('libelle');
  }

  get prixVente(): AbstractControl | null {
    return this.articleForm.get('prixVente');
  }

  get qteStock(): AbstractControl | null {
    return this.articleForm.get('qteStock');
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.articleForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.articleForm.get(fieldName);
    return !!(field && field.valid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.articleForm.get(fieldName);
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
      if (field.errors['min']) {
        return `${this.getFieldLabel(fieldName)} doit être supérieur à ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `${this.getFieldLabel(fieldName)} ne peut pas dépasser ${field.errors['max'].max}`;
      }
      if (field.errors['whitespace']) {
        return `${this.getFieldLabel(fieldName)} ne peut pas contenir que des espaces`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: {[key: string]: string} = {
      'libelle': 'Le libellé',
      'prixVente': 'Le prix de vente',
      'qteStock': 'La quantité en stock'
    };
    return labels[fieldName] || 'Ce champ';
  }
}
