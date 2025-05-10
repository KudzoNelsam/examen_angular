import { Departement } from "./departement.model";
import { Employe } from "./employe.model";

export interface ListEmploye {
    champ: string;
    departement: Departement;
    statut: string;
    employes: Employe[];
    departements : Departement[];
    statuts: string[];
}