import {IGenericService} from './IGenericService';
import {Observable} from 'rxjs';
import {RequestResponse} from '../models/request.response.model';

export interface IArticleService extends IGenericService {
  updateStock(id: string, qteStock: number): Observable<RequestResponse>;
  searchByLibelle(libelle: string, page?: number, size?: number): Observable<RequestResponse>;
  getAvailableArticles(page?: number, size?: number): Observable<RequestResponse>;
  getByLibelle(libelle: string): Observable<RequestResponse>;
  decrementStock(id: string, quantity: number): Observable<RequestResponse>;
}
