import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieInterface } from '../../models/Categorie.model';

export interface CategorieCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}

export abstract class CategorieCrud<T, ID> implements CategorieCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    getCategories(): Observable<CategorieInterface[]> {
        return this.http.get<CategorieInterface[]>(this.uri + "get-all");
    }

    getCategory(id: string): Observable<CategorieInterface> {
        return this.http.get<CategorieInterface>(this.uri + id);
    }

    create(creadentials: CategorieInterface): Observable<CategorieInterface> {
        return this.http.post<CategorieInterface>(this.uri + "create", creadentials);
    }

    updateCategory(id: string, creadentials: CategorieInterface): Observable<CategorieInterface> {
        return this.http.put<CategorieInterface>(this.uri + id, creadentials);
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
