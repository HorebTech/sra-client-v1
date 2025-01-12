import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject, takeUntil } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserHttp } from "./User.http.service";
import { AuthResponse, TokenPayload, UserRoleAccess, Utilisateur } from "../../models/User.model";
import { AdminMenu, AgentMenu } from "../../layout/app.menu.manager";

@Injectable({
    providedIn: 'root'
})
export class UserController {
    loading: boolean = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: UserHttp
    ){}

    jwtHelper = new JwtHelperService();
    tokenDecoded = new BehaviorSubject<TokenPayload | null>(null);

    FindUserByName(nom: string) {
        return this.service.findUserByName(`auth/${nom}`).pipe(takeUntil(this.destroy$));
    }

    UserRegistration(credential: Utilisateur) {
        return this.service.registerUser(credential).pipe(takeUntil(this.destroy$));
    }

    UserLogin(credential: Utilisateur) {
        return this.service.loginUser(credential).pipe(takeUntil(this.destroy$));
    }

    UserChangePassword(credential: Utilisateur) {
        return this.service.changePassword(credential).pipe(takeUntil(this.destroy$));
    }
 
    UserLogout(email: string): Observable<any> {
        return this.service.logoutUser(`users/logout/${email}`, "").pipe(takeUntil(this.destroy$));
    }

    RefreshToken(credential: AuthResponse) {
        return this.service.refreshToken(credential).pipe(takeUntil(this.destroy$));
    }

    UserUpdate(userId: string, userdata: Utilisateur) {
        return this.service.updateUser(userId, userdata).pipe(takeUntil(this.destroy$));
    }

    UserUpdatePhoto(userId: string, userdata: Utilisateur) {
        return this.service.updateUserPhoto(userId, userdata).pipe(takeUntil(this.destroy$));
    }

    UserUpdateByAdmin(userdata: Utilisateur) {
        return this.service.userUpdateByAdmin(userdata).pipe(takeUntil(this.destroy$));
    }

    UserDelete(id: string) {
        return this.service.userDelete(id).pipe(takeUntil(this.destroy$));
    }

    GetUsers() {
        return this.service.getUsers().pipe(takeUntil(this.destroy$));
    }

    SetLocalstorage(tokens: AuthResponse) {
        localStorage.setItem('userdata', JSON.stringify(tokens))
    }

    GetMenuList(userrole: string): Observable<UserRoleAccess[]> {
            if (userrole === "ADMIN") {return of(AdminMenu);
        } else if(userrole === "Agent") {return of(AgentMenu);
        } else {return of(AdminMenu);}
    }

    getAccessToken() {
        const localStorageToken = localStorage.getItem('userdata');
        if(localStorageToken) {
          const token = JSON.parse(localStorageToken) as AuthResponse;
          const tokenDecode = this.jwtHelper.decodeToken(token.accessToken as any);
          this.tokenDecoded.next(tokenDecode);
          return token.accessToken;
        } else {
          return "";
        }
      }
}