import {IGenericService} from './IGenericService';
import {RequestResponse} from '../models/request.response.model';
import {Observable} from 'rxjs';


export interface IClientService extends IGenericService {
  search(query: string, page?: number, size?: number): Observable<RequestResponse>;
  getByTelephone(telephone: string): Observable<RequestResponse>;
  getClientWithDettes(clientId: string): Observable<RequestResponse>;
}
