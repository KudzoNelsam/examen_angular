import { Observable } from "rxjs";
import { RequestResponse } from "../models/request.response.model";

export interface IGenericService {
  getAll(page?: number, size?: number): Observable<RequestResponse>;
  getById(id: string): Observable<RequestResponse>;
  create(data: any): Observable<RequestResponse>;
  update(id: string, data: any): Observable<RequestResponse>;
  delete(id: string): Observable<RequestResponse>;
  get(url: string): Observable<RequestResponse>;
}
