import { Observable } from "rxjs";
import { RequestResponse } from "../models/request.response.model";

export interface IPeriodeService {

    getActualPeriode(): Observable<RequestResponse>;

}