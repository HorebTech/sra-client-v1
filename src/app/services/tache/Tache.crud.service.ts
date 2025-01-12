import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TacheCredentials, TacheInterface } from '../../models/Tache.model';

export interface TacheCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}

export abstract class TacheCrud<T, ID> implements TacheCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    getTaches(): Observable<TacheInterface[]> {
        return this.http.get<TacheInterface[]>(this.uri + "get-all");
    }

    getTache(id: string): Observable<TacheInterface> {
        return this.http.get<TacheInterface>(this.uri + id);
    }

    create(creadentials: TacheCredentials): Observable<TacheInterface> {
        return this.http.post<TacheInterface>(this.uri + "create", creadentials);
    }

    updateTache(creadentials: TacheCredentials): Observable<TacheInterface> {
        return this.http.put<TacheInterface>(this.uri + creadentials.id, creadentials);
    }

    remove(id: string) {
        return this.http.delete(this.uri + id );
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
