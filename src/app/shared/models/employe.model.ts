import { Bulletin } from "./bulletin.model";
import { Remuneration } from "./remuneration.model";

export interface Employe {
    id: number;
    anciennete: number;
    matricule: string;
    nom: string;
    prenom: string;
    sexe: string;
    email: string;
    telephone: string;
    adresse: string;
    salaireBase: number;
    poste: string;
    departement: string;
    coefficient: number;
    statut: string;
    dateEmbauche: string;
}

export interface EmployeWithBulletins {
    employe: Employe;
    bulletins: Bulletin[];
}

export interface EmployeWithRemunerations {
    employe: Employe;
    remunerations: Remuneration[];
}

export interface EmployeWithDatas {
    employe: Employe;
    bulletins: Bulletin[];
    remunerations: Remuneration[];
}
    



