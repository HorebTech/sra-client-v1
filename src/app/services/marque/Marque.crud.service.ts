import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarqueInterface } from '../../models/Marque.model';

export interface MarqueCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}

export abstract class MarqueCrud<T, ID> implements MarqueCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    getMarques(): Observable<MarqueInterface[]> {
        return this.http.get<MarqueInterface[]>(this.uri + "get-all");
    }

    getMarque(id: string): Observable<MarqueInterface> {
        return this.http.get<MarqueInterface>(this.uri + id);
    }

    create(creadentials: MarqueInterface): Observable<MarqueInterface> {
        return this.http.post<MarqueInterface>(this.uri + "create", creadentials);
    }

    updateMarque(id: string, creadentials: MarqueInterface): Observable<MarqueInterface> {
        return this.http.put<MarqueInterface>(this.uri + id, creadentials);
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
