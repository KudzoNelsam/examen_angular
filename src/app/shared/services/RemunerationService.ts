import { Observable } from "rxjs";
import { RequestResponse } from "../models/request.response.model";

export interface IRemunerationService {
    getRemunerationsNonAssociees(id : number): Observable<RequestResponse>;
}