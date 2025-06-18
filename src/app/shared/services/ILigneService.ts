import { IGenericService } from './IGenericService';
import { Observable } from 'rxjs';
import { RequestResponse } from '../models/request.response.model';

export interface ILigneService extends IGenericService {
  getByDetteId(detteId: string, page?: number, size?: number): Observable<RequestResponse>;
  getByArticleId(articleId: string, page?: number, size?: number): Observable<RequestResponse>;
  getAllByDetteId(detteId: string): Observable<RequestResponse>;
  deleteByDetteId(detteId: string): Observable<RequestResponse>;
  getLigneWithArticle(ligneId: string): Observable<RequestResponse>;
}
