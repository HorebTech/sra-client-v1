import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials, ObjetInterface } from '../../models/Objet.model';

export interface ObjetCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}

export abstract class ObjetCrud<T, ID> implements ObjetCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    get(id: string): Observable<ObjetInterface> {
        return this.http.get<ObjetInterface>(this.uri + id);
    }

    gets(): Observable<ObjetInterface[]> {
        return this.http.get<ObjetInterface[]>(this.uri + "get-all");
    }

    getByStateAndOther(statut: string, numero: string): Observable<ObjetInterface[]> {
        return this.http.get<ObjetInterface[]>(this.uri + statut +"/"+ numero);
    }

    create(credentials: Credentials): Observable<ObjetInterface> {
        return this.http.post<ObjetInterface>(this.uri + "create" , credentials);
    }

    updateState(credentials: Credentials): Observable<ObjetInterface> {
        console.log("CREDENTIALS pour le contenu OBJET ", credentials);
        return this.http.put<ObjetInterface>(this.uri + "update/" + credentials.id, credentials);
    }

    updateEtat(id: string, statut: string): Observable<ObjetInterface> {
        return this.http.put<ObjetInterface>(this.uri + "update/" + id, {statut});
    }

    remove(id: string): Observable<ObjetInterface> {
        return this.http.delete<ObjetInterface>(this.uri + id);
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
