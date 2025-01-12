import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialNettoyageChoisit, NettoyageChoisieInterface } from '../../models/NettoyageChoisieModel.model';

export interface NettoyageChoisieCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}

export abstract class NettoyageChoisieCrud<T, ID> implements NettoyageChoisieCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    get(id: string): Observable<NettoyageChoisieInterface> {
        return this.http.get<NettoyageChoisieInterface>(this.uri + id);
    }

    gets(): Observable<NettoyageChoisieInterface[]> {
        return this.http.get<NettoyageChoisieInterface[]>(this.uri + "get-all");
    }

    create(credentials: CredentialNettoyageChoisit): Observable<NettoyageChoisieInterface> {
        return this.http.post<NettoyageChoisieInterface>(this.uri + "create", credentials);
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
