import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthResponse, Utilisateur } from '../../models/User.model';

export interface UserCrudOperations<T, ID> {

    save(t: T): Observable<HttpResponse<T>>;

    update(t: T): Observable<HttpResponse<T>>;

    findAll(): Observable<HttpResponse<Array<T>>>;

    delete(id: ID): Observable<HttpResponse<void>>;
}


export abstract class UserCrud<T, ID> implements UserCrudOperations<T, ID> {

    protected constructor(
        protected http: HttpClient,
        protected uri: string
    ) {}

    findUserByName(nom: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.uri + nom, {});
    }

    loginUser(credential: Utilisateur): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.uri + "auth/login", credential);
    }

    registerUser(credential: Utilisateur): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.uri + "admin/register", credential);
    }

    changePassword(credential: Utilisateur): Observable<AuthResponse> {
        return this.http.put<AuthResponse>(this.uri + "auth/change-password", credential);
    }

    logoutUser(u: string, email: String): Observable<T> {
        return this.http.post<T>(this.uri+ u + email, {});
    }

    refreshToken(credential: AuthResponse): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.uri + "auth/refresh-token", credential);
    }

    updateUser(userId: string, credentials: Utilisateur): Observable<AuthResponse> {
        return this.http.put<AuthResponse>(this.uri + "users/update-user/" + userId, credentials);
    }

    updateUserPhoto(userId: string, credentials: Utilisateur): Observable<AuthResponse> {
        return this.http.put<AuthResponse>(this.uri + "users/update-user/" + userId, credentials);
    }

    userUpdateByAdmin(credentials: Utilisateur): Observable<AuthResponse> {
        return this.http.put<AuthResponse>(this.uri + `users/update-user/${credentials.id}`, credentials);
    }

    userDelete(id: string) {
        return this.http.delete(this.uri + `admin/delete/user/${id}`);
    }

    getUsers(): Observable<Utilisateur[]> {
        return this.http.get<Utilisateur[]>(this.uri + "admin/get-all/users");
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
