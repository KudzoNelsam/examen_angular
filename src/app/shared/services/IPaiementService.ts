import { IGenericService } from './IGenericService';
import { Observable } from 'rxjs';
import { RequestResponse } from '../models/request.response.model';

export interface IPaiementService extends IGenericService {
  getByDetteId(detteId: string, page?: number, size?: number): Observable<RequestResponse>;
  getByClientId(clientId: string, page?: number, size?: number): Observable<RequestResponse>;
  getAllByDetteId(detteId: string): Observable<RequestResponse>;
  getAllByClientId(clientId: string): Observable<RequestResponse>;
  getByDateRange(dateDebut: string, dateFin: string, page?: number, size?: number): Observable<RequestResponse>;
  getTotalByDette(detteId: string): Observable<RequestResponse>;
  getTotalByClient(clientId: string): Observable<RequestResponse>;
  getTotalPaiementsToday(): Observable<RequestResponse>;
}
