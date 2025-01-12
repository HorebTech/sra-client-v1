import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatutInterface } from '../../models/Statut.model';

export interface StatutCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}

export abstract class StatutCrud<T, ID> implements StatutCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    getStatuts(): Observable<StatutInterface[]> {
        return this.http.get<StatutInterface[]>(this.uri + "get-all");
    }

    getCategory(id: string): Observable<StatutInterface> {
        return this.http.get<StatutInterface>(this.uri + id);
    }

    create(creadentials: StatutInterface): Observable<StatutInterface> {
        return this.http.post<StatutInterface>(this.uri + "create", creadentials);
    }

    updateCategory(id: string, creadentials: StatutInterface): Observable<StatutInterface> {
        return this.http.put<StatutInterface>(this.uri + id, creadentials);
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
