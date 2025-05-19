import { Observable } from "rxjs";
import { RequestResponse } from "../models/request.response.model";
import { IGenericService } from "./IGenericService";

export interface IEmployeService extends IGenericService {
    filter(champ: string, statut: string, departementId: number, page: number, size: number): Observable<RequestResponse>;
    getWithBulletins(id: number): Observable<RequestResponse>;
    getWithRemunerations(id: number): Observable<RequestResponse>;
    getWithDatas(id: number): Observable<RequestResponse>;
    generateBulletin(id: number, periode: number): Observable<RequestResponse>;
    generateAll(periode: number, departementId : number): Observable<RequestResponse>;
}