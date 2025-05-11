import { Observable } from "rxjs";
import { RequestResponse } from "../models/request.response.model";
import { EmployeRemuneration } from "../models/employe.remuneration.model";
import { EmployeRemunerationUpdateRequest } from "../models/requests/employe.remuneration.update.model";

export interface IEmployeRemunerationService {
    addToEmploye(remuneration: EmployeRemuneration): Observable<RequestResponse>;
    updateRemuneration(remunerationId : number,remuneration: EmployeRemunerationUpdateRequest): Observable<RequestResponse>;
}