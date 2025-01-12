import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChambreModel } from '../../models/Chambre.model';

export interface ChambreCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}

export abstract class ChambreCrud<T, ID> implements ChambreCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    getRoom(id: string): Observable<ChambreModel> {
        return this.http.get<ChambreModel>(this.uri + id);
    }

    getRooms(): Observable<ChambreModel[]> {
        return this.http.get<ChambreModel[]>(this.uri + 'get-all');
    }

    getRoomsState(etat: string): Observable<ChambreModel[]> {
        return this.http.get<ChambreModel[]>(this.uri + "get-all/" + etat);
    }

    create(credentials: ChambreModel): Observable<ChambreModel> {
        return this.http.post<ChambreModel>(this.uri + "create", credentials);
    }

    updateRoom(credentials: ChambreModel): Observable<ChambreModel> {
        return this.http.put<ChambreModel>(this.uri + "update/" + credentials.id, credentials);
    }

    updateState(id: string, etat: string): Observable<ChambreModel> {
        return this.http.put<ChambreModel>(this.uri + "update/" + id + "/" + etat, {});
    }

    deleteRoom(chambreId: string) {
        return this.http.delete(this.uri + "delete/" + chambreId);
    }
    
    
    save(t: T): Observable<HttpResponse<T>> {
        return this.http.post<T>(this.uri, t, {observe: 'response'});
    }

    update(t: T): Observable<HttpResponse<T>> {
        return this.http.put<T>(this.uri, t, {observe: 'response'});
    }

    findAll(): Observable<HttpResponse<Array<T>>> {
        return this.http.get<T[]>(this.uri, {observe: 'response'});
    }

    delete(id: ID): Observable<HttpResponse<void>> {
        return this.http.delete<void>(this.uri + '/' + id, {observe: 'response'});
    }

}
