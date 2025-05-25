import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartementService } from '../../shared/services/impl/departement.service';

@Component({
  selector: 'app-departement',
  imports: [FormsModule, CommonModule],
  templateUrl: './departement.component.html',
  styleUrl: './departement.component.css'
})
export class DepartementComponent implements OnInit {
  departements: Departement[] = [];
  departement: Departement = this.initDepartement();
  editing: boolean = false;

  constructor(private readonly depService: DepartementService) { }

  ngOnInit(): void {
    this.loadDepartements();
  }

  loadDepartements() {
    this.depService.getAll().subscribe({
      next: (data) => {
        this.departements = (data.results ?? []).reverse(); // Si tu veux la liste renversée
      },
      error: (er) => console.log(er),
    });
  }

  editDepartement(dep: Departement) {
    this.editing = true;
    this.departement = { ...dep };
  }

  saveDepartement(form: any) {
    if (!this.departement.nom?.trim()) return;

    if (this.editing && this.departement.id) {
      // Edition : appel API update
      this.depService.update(this.departement.id, this.departement).subscribe({
        next: () => {
          this.loadDepartements();
          this.resetForm(form);
        },
        error: (err) => console.log(err)
      });
    } else {
      // Création : appel API create
      this.depService.create(this.departement).subscribe({
        next: () => {
          this.loadDepartements();
          this.resetForm(form);
        },
        error: (err) => console.log(err)
      });
    }
  }

  deleteDepartement(id: number) {
    if (confirm('Supprimer ce département ?')) {
      this.depService.delete(id).subscribe({
        next: () => {
          this.loadDepartements();
          this.cancelEdit();
        },
        error: (err) => console.log(err)
      });
    }
  }

  cancelEdit() {
    this.editing = false;
    this.departement = this.initDepartement();
  }

  private resetForm(form: any) {
    this.departement = this.initDepartement();
    this.editing = false;
    form.resetForm();
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