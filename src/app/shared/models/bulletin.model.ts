export interface Bulletin {
    id: number;
    salaireBrut: number;
    netImposable: number;
    netAPayer: number;
    dateGeneration: string;
    dateDebut: string;
    dateFin: string;
    chargeSalariale: number;
    chargePatronale: number;
    employeNom: string;
    employePrenom: string;
    mois: string;
    sent: boolean;
}

export enum PayStatus {
    PAYE = 'payé',
    EN_ATTENTE = 'en attente',
    ENVOYE = 'envoyé'
}