import { IGenericService } from './IGenericService';
import { Observable } from 'rxjs';
import { RequestResponse } from '../models/request.response.model';

export interface IDetteService extends IGenericService {
  getByClientId(clientId: string, page?: number, size?: number): Observable<RequestResponse>;
  getDettesSoldees(page?: number, size?: number): Observable<RequestResponse>;
  getDettesNonSoldees(page?: number, size?: number): Observable<RequestResponse>;
  updateMontants(id: string, montantDette: number, montantPaye: number): Observable<RequestResponse>;
  getByDateRange(dateDebut: string, dateFin: string, page?: number, size?: number): Observable<RequestResponse>;
  getDetteWithDetails(detteId: string): Observable<RequestResponse>;
  getAllDettesByClient(clientId: string): Observable<RequestResponse>;
}
