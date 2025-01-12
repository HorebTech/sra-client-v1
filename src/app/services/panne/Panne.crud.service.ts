import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PanneCountMarque, PanneCredentials, PanneInterface } from '../../models/Panne.model';

export interface PanneCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}

export abstract class PanneCrud<T, ID> implements PanneCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    get(id: string): Observable<PanneInterface> {
        return this.http.get<PanneInterface>(this.uri + id);
    }

    gets(): Observable<PanneInterface[]> {
        return this.http.get<PanneInterface[]>(this.uri + "get-all");
    }

    getByDay(date: string): Observable<PanneInterface[]> {
        return this.http.get<PanneInterface[]>(this.uri + "get-all/"+ date);
    }

    getByDates(dateDebut: string, dateFin: string): Observable<PanneInterface[]> {
        return this.http.get<PanneInterface[]>(this.uri + 'get-all/' +dateDebut +"/"+ dateFin);
    }

    getRoomByDates(): Observable<any[]> {
        const formattedDateFin = new Date().toISOString().split('T')[0]; // Format 'yyyy-MM-dd'
        return this.http.get<any[]>(this.uri + 'get-all/room/1970-01-02 04:00:00/' + formattedDateFin +'00:00:00');
    }

    getMaxPannesRooms(): Observable<any[]> {
        return this.http.get<any[]>(this.uri + 'max-pannes-room');
    }

    getByStateAndOther(statut: string, numero: string): Observable<PanneInterface[]> {
        return this.http.get<PanneInterface[]>(this.uri + statut +"/"+ numero);
    }

    countByMarque(): Observable<PanneCountMarque[]> {
        return this.http.get<PanneCountMarque[]>(this.uri + "count-by-marque");
    }

    create(credentials: PanneCredentials): Observable<PanneInterface> {
        return this.http.post<PanneInterface>(this.uri + "create" , credentials);
    }

    updateState(credentials: PanneCredentials): Observable<PanneInterface> {
        return this.http.put<PanneInterface>(this.uri + "update/" + credentials.id , credentials);
    }

    updateEtat(id: string, statut: string): Observable<PanneInterface> {
        return this.http.put<PanneInterface>(this.uri + "update/" + id, {statut});
    }

    remove(id: string): Observable<PanneInterface> {
        return this.http.delete<PanneInterface>(this.uri + id);
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
