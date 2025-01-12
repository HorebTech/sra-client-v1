import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials, PasseInterface } from '../../models/Passe.model';

export interface PasseCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}

export abstract class PasseCrud<T, ID> implements PasseCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    gets(): Observable<PasseInterface[]> {
        return this.http.get<PasseInterface[]>(this.uri + "get-all");
    }
    
    getByStateAndUser(nom: string, agent: string): Observable<PasseInterface[]> {
        return this.http.get<PasseInterface[]>(this.uri + "get-all/" + nom + "/" + agent);
    }

    getByStateDateAndUser(nom: string, agent: string, date: string): Observable<PasseInterface[]> {
        return this.http.get<PasseInterface[]>(this.uri + "get-all/" + nom + "/" + agent + "/"+ date);
    }

    getCurrent(agent: string, date: string): Observable<PasseInterface[]> {
        return this.http.get<PasseInterface[]>(this.uri + "get-all/agent/" + agent + "/" + date);
    }

    getByState(nom: string): Observable<PasseInterface[]> {
        return this.http.get<PasseInterface[]>(this.uri + "get-all/" + nom);
    }

    get(passeId: number): Observable<T> {
        return this.http.get<T>(this.uri + passeId);
    }
    
    create(credentials: Credentials): Observable<T> {
        return this.http.post<T>(this.uri + "create", credentials);
    }

    updatePasse(credentials: Credentials): Observable<T> {
        return this.http.put<T>(this.uri + credentials.id, credentials);
    }

    updateState(passeId: number, nom: string): Observable<T> {
        return this.http.put<T>(this.uri + 'update/' + passeId + '/' + nom, {});
    }

    remove(passeId: number) {
        return this.http.delete(this.uri + passeId);
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
