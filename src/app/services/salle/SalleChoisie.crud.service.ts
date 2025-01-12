import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalleChoisieCredentials, SalleChoisieInterface } from '../../models/SalleChoisieModel.model';

export interface SalleChoisieCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}

export abstract class SalleChoisieCrud<T, ID> implements SalleChoisieCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    get(id: string): Observable<SalleChoisieInterface> {
        return this.http.get<SalleChoisieInterface>(this.uri + id);
    }

    gets(): Observable<SalleChoisieInterface[]> {
        return this.http.get<SalleChoisieInterface[]>(this.uri + "get-all");
    }

    create(credentials: SalleChoisieCredentials): Observable<SalleChoisieInterface> {
        return this.http.post<SalleChoisieInterface>(this.uri + "create", credentials);
    }

    updateChoosedHall(id: string, credentials: SalleChoisieCredentials): Observable<SalleChoisieInterface> {
        return this.http.put<SalleChoisieInterface>(this.uri + id, credentials);
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
