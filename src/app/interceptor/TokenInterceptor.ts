import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserController } from '../services/user/User.controller.service';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/User.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: Observable<any> | null = null;

    userService = inject(UserController);
    jwtHelper = inject(JwtHelperService);
    router = inject(Router);

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes("auth")) {
            return next.handle(request);
        }

        const localStorageToken = localStorage.getItem('userdata');
        if (localStorageToken) {
            const token = JSON.parse(localStorageToken) as AuthResponse;
            const isTokenExpired = this.jwtHelper.isTokenExpired(token.accessToken as string);

            if (isTokenExpired) {
                return this.addToQueueAndRefresh(request, next, token);
            }

            // Ajoute le token à l’en-tête si valide
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token.accessToken}`,
                },
            });
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigate(['/']);
                }
                return throwError(() => error);
            })
        );
    }

    private addToQueueAndRefresh(
      request: HttpRequest<any>,
      next: HttpHandler,
      token: AuthResponse
  ): Observable<HttpEvent<any>> {
      if (!this.isRefreshing) {
          this.isRefreshing = true;
  
          this.refreshTokenSubject = this.userService.RefreshToken(token).pipe(
              switchMap((newToken: AuthResponse) => {
                  // Met à jour le token dans localStorage
                  localStorage.setItem('userdata', JSON.stringify(newToken));
                  this.isRefreshing = false;
                  this.refreshTokenSubject = null;
  
                  return next.handle(
                      request.clone({
                          setHeaders: {
                              Authorization: `Bearer ${newToken.accessToken}`,
                          },
                      })
                  );
              }),
              catchError((error) => {
                  this.isRefreshing = false;
                  this.refreshTokenSubject = null;
                  this.router.navigate(['/']);
                  return throwError(() => error);
              })
          );
  
          return this.refreshTokenSubject;
      } else {
          return this.refreshTokenSubject!.pipe(
              switchMap(() => {
                  const updatedToken = JSON.parse(localStorage.getItem('userdata')!) as AuthResponse;
                  return next.handle(
                      request.clone({
                          setHeaders: {
                              Authorization: `Bearer ${updatedToken.accessToken}`,
                          },
                      })
                  );
              })
          );
      }
  }
}