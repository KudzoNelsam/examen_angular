import { Observable } from "rxjs";
import { RequestResponse } from "../models/request.response.model";

export interface ILayoutService {

    getPeriode(): Observable<RequestResponse>;

}