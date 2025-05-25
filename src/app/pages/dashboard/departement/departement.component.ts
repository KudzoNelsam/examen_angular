import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departement',
  imports: [FormsModule, CommonModule,],
  templateUrl: './departement.component.html',
  styleUrl: './departement.component.css'
})
export class DepartementComponent {
  departements: Departement[] = [
    { id: 1, nom: 'Informatique', employes: [{ id: 1, nom: 'Jean' }] },
    { id: 2, nom: 'RH', employes: [] }
  ];
  departement: Departement = this.initDepartement();
  editing: boolean = false;
  private nextId = 3;

  editDepartement(dep: Departement) {
    this.editing = true;
    this.departement = { ...dep };
  }

  saveDepartement(form: any) {
    if (!this.departement.nom?.trim()) {
      // Le formulaire va afficher l'erreur grâce à depForm.submitted
      return;
    }
    if (this.editing) {
      const idx = this.departements.findIndex(d => d.id === this.departement.id);
      if (idx > -1) this.departements[idx].nom = this.departement.nom;
    } else {
      this.departement.id = this.nextId++;
      this.departements.push({ ...this.departement, employes: [] });
    }
    this.departement = this.initDepartement();
    this.editing = false;
    form.resetForm();
  }

  deleteDepartement(id: number) {
    if (confirm('Supprimer ce département ?')) {
      this.departements = this.departements.filter(dep => dep.id !== id);
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editing = false;
    this.departement = this.initDepartement();
  }

  private initDepartement(): Departement {
    return { id: 0, nom: '', employes: [] };
  }

}


interface Employe {
  id: number;
  nom: string;
  // autres propriétés selon ton modèle
}

interface Departement {
  id: number;
  nom: string;
  employes?: Employe[];
}