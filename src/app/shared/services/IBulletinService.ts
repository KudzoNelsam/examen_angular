import { Observable } from "rxjs";
import { RequestResponse } from "../models/request.response.model";

export interface IBulletinService {
    download(bulletinId: number): Observable<Blob>;
    filter(champ :string): Observable<RequestResponse>;
}