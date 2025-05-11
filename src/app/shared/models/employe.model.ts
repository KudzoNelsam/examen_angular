export interface Employe {
    id: number;
    nom: string;
    prenom: string;
    matricule: string;
    sexe: string;
    adresse: string;
    telephone: string;
    email: string;
    salaireBase: number;
    anciennete: number;
    poste: string;
    departement: string;
    coefficient: number;
    statut: string;
    dateEmbauche: string;
}

export interface EmployeWithBulletins {
    id: number;
    nom: string;
    prenom: string;
    matricule: string;
    sexe: string;
    adresse: string;
    telephone: string;
    email: string;
    salaireBase: number;
    anciennete: number;
    poste: string;
    departement: string;
    coefficient: number;
    statut: string;
    dateEmbauche: string;
    bulletins: Bulletin[];
}

export interface Bulletin {
    id: number;
    mois: string;
    dateDebut: string;
    dateFin: string;
    dateGeneration: string;
    employeNom: string;
    employePrenom: string;
    salaireBrut: number;
    chargeSalariale: number;
    chargePatronale: number;
    netImposable: number;
    netAPayer: number;
    status: PayStatus;
}




export enum PayStatus {
    PAYE = 'payé',
    EN_ATTENTE = 'en attente',
    ENVOYE = 'envoyé'
}