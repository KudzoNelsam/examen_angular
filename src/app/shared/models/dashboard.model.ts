import { Bulletin } from "./bulletin.model";
import { ChargeSociale } from "./charge.sociale.model";
import { Departement } from "./departement.model";
import { PeriodeBulletinResponse } from "./layout.model";
import { MasseSalariale } from "./masse.salariale.model";
import { RepartitionDepartement } from "./repartition.departement.model";

export interface Dashboard {
    employeActif : number;
    employeTotal : number;
    bulletinGenere : number;
    bulletinEnvoye : number;
    masseSalariale : number;
    chargeSociale : number;
    periodeSelectionee : PeriodeBulletinResponse;
    periodes : PeriodeBulletinResponse [];
    departements : Departement[];
    masseSalariales : MasseSalariale [];
    chargeSociales : ChargeSociale [];
    repartitionDepartements : RepartitionDepartement [];
    bulletins : Bulletin [];
}