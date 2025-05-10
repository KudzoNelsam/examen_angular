import { Observable } from "rxjs";
import { RequestResponse } from "../models/request.response.model";

export interface IGenericService  {

    getAll(size: number, page: number): Observable<RequestResponse >;
    getAll(): Observable<RequestResponse>;
    getById(id: number): Observable<RequestResponse>;
    create(data: any): Observable<RequestResponse>;
    update(id: number, data: any): Observable<RequestResponse>;
    delete(id: number): Observable<RequestResponse>;

}