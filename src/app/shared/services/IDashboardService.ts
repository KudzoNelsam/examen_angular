import { Observable } from "rxjs";
import { RequestResponse } from "../models/request.response.model";

export interface IDashboardService {
    getSummary(departementId : number, periodeId : number): Observable<RequestResponse>;
}