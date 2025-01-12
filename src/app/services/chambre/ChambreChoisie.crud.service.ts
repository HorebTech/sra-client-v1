import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChambreChoisieCredentials, ChambreChoisieInterface } from '../../models/ChambreChoisieModel.model';

export interface ChambreChoisieCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}

export abstract class ChambreChoisieCrud<T, ID> implements ChambreChoisieCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    getChoosedRoom(id: string): Observable<ChambreChoisieInterface> {
        return this.http.get<ChambreChoisieInterface>(this.uri + id);
    }

    getChoosedRooms(): Observable<ChambreChoisieInterface[]> {
        return this.http.get<ChambreChoisieInterface[]>(this.uri + "get-all");
    }

    create(credentials: ChambreChoisieCredentials): Observable<ChambreChoisieInterface> {
        return this.http.post<ChambreChoisieInterface>(this.uri + 'create', credentials);
    }

    updateChoosedRoom(id: string, credentials: ChambreChoisieCredentials): Observable<ChambreChoisieInterface> {
        return this.http.put<ChambreChoisieInterface>(this.uri + id, (credentials));
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
