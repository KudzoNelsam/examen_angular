import { Observable } from "rxjs";

export interface IBulletinService {
    download(bulletinId: number): Observable<Blob>;
}