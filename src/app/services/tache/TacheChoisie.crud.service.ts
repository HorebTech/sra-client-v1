import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialTacheChoisie, TacheChoisieInterface } from '../../models/TacheChoisieModel.model';

export interface TacheChoisieCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}

export abstract class TacheChoisieCrud<T, ID> implements TacheChoisieCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    get(id: string): Observable<TacheChoisieInterface> {
        return this.http.get<TacheChoisieInterface>(this.uri + id);
    }

    gets(): Observable<TacheChoisieInterface[]> {
        return this.http.get<TacheChoisieInterface[]>(this.uri + "get-all");
    }

    create(credentials: CredentialTacheChoisie): Observable<TacheChoisieInterface> {
        return this.http.post<TacheChoisieInterface>(this.uri + "create", credentials);
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
