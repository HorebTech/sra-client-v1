import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NettoyageCredentials, NettoyageInterface } from '../../models/Nettoyage.model';

export interface NettoyageCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}

export abstract class NettoyageCrud<T, ID> implements NettoyageCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    getNettoyages(): Observable<NettoyageInterface[]> {
        return this.http.get<NettoyageInterface[]>(this.uri + "get-all");
    }

    getNettoyage(id: string): Observable<NettoyageInterface> {
        return this.http.get<NettoyageInterface>(this.uri + id);
    }

    create(creadentials: NettoyageCredentials): Observable<NettoyageInterface> {
        return this.http.post<NettoyageInterface>(this.uri + "create", creadentials);
    }

    updateNettoyage(creadentials: NettoyageCredentials): Observable<NettoyageInterface> {
        return this.http.put<NettoyageInterface>(this.uri + creadentials.id, creadentials);
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
