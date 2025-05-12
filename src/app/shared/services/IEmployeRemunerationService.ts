import { Observable } from "rxjs";
import { RequestResponse } from "../models/request.response.model";
import { EmployeRemunerationUpdateRequest } from "../models/requests/employe.remuneration.update.model";
import { EmployeRemunerationRequest } from "../models/requests/employe.remuneration.model";

export interface IEmployeRemunerationService {
    addToEmploye(remuneration: EmployeRemunerationRequest): Observable<RequestResponse>;
    updateRemuneration(remunerationId : number,remuneration: EmployeRemunerationUpdateRequest): Observable<RequestResponse>;
}