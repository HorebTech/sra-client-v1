import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalleInterface } from '../../models/Salle.model';

export interface SalleCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}

export abstract class SalleCrud<T, ID> implements SalleCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    get(id: string): Observable<SalleInterface> {
        return this.http.get<SalleInterface>(this.uri + id);
    }

    getHalls(): Observable<SalleInterface[]> {
        return this.http.get<SalleInterface[]>(this.uri + "get-all");
    }

    getHallsState(etat: string): Observable<SalleInterface[]> {
        return this.http.get<SalleInterface[]>(this.uri + 'get-all/' + etat);
    }

    create(credentials: SalleInterface): Observable<SalleInterface> {
        return this.http.post<SalleInterface>(this.uri + 'create' , credentials);
    }

    updateHall(credentials: SalleInterface): Observable<SalleInterface> {
        return this.http.put<SalleInterface>(this.uri + "update/" + credentials.id, credentials);
    }

    updateHallState(id: string, etat: string): Observable<SalleInterface> {
        return this.http.put<SalleInterface>(this.uri + "update/" + id + '/' + etat, {});
    }

    remove(id: string) {
        return this.http.delete(this.uri + id);
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
