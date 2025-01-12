import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BehaviorSubject, catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserController } from "../../services/user/User.controller.service";
import { AuthResponse } from "../../models/User.model";
import { beginLogin, beginRegister, deleteUtilisateur, fetchmenu, fetchmenusuccess, getUserByName, getUserByNameSuccess, getUtilisateurs, getUtilisateursSuccess, passwordReset, passwordResetSuccess, updateUserPhoto, updateUtilisateur, updateUtilisateurByAdmin, updateUtilisateurByAdminSuccess, updateUtilisateurSuccess } from "./User.action";
import { showToast, userConnected, userConnectedSuccess } from "../Common/App.action";
import { getTodayDate, convertirDate } from "../../dashboard/utils";
import { findNewAndCurrentPasses } from "../Passe/Passe.action";
import { getPannesInRoom } from "../Panne/Panne.action";

@Injectable()
export class UserEffect {

    route = inject(Router);
    service = inject(UserController);
    action$ = inject(Actions);


    jwtHelper = new JwtHelperService();
    tokenDecoded = new BehaviorSubject<AuthResponse | null>(null);

    _getUserByName = createEffect(() =>
        this.action$.pipe(
            ofType(getUserByName),
            exhaustMap((action) => {
                return this.service.FindUserByName(action.nom).pipe(
                    map((data) => {
                        return getUserByNameSuccess({ isUserExisted: true })
                       }),
                    catchError((_error) => of(
                        getUserByNameSuccess({ isUserExisted: false }),
                    ))
                )
            })
        )
    );

    _userlogin = createEffect(() => 
        this.action$.pipe(
            ofType(beginLogin),
            exhaustMap((action) => {
                return this.service.UserLogin(action.credential).pipe(
                    switchMap((data: AuthResponse) => {
                        if(data.statusCode == 200){
                            const _userdata = data;
                            const tokenDecode = this.jwtHelper.decodeToken(_userdata.accessToken as any);
                            
                            const today = getTodayDate();
                            const date = new Date();
                            const dateDuJourConvertie = convertirDate(date); 
                            this.tokenDecoded.next(tokenDecode);

                            const _dates = {
                                dateDebut: "1970-01-02 04:00:00",
                                dateFin: dateDuJourConvertie
                            }

                            this.service.SetLocalstorage(_userdata);
                            this.route.navigate(['/']);
                            if(_userdata.role !== "Agent"){
                                this.route.navigate(['/dashboard']);
                                getPannesInRoom();
                            } else {
                                this.route.navigate(['/dashboard/agent']);
                                findNewAndCurrentPasses({agent: _userdata.nom as string, date: today})
                            }
                            return of(showToast({ severity: 'success', summary: 'Succès !', detail: 'Connexion réussit!', life: 10000 }),
                            fetchmenu({ userrole: _userdata.role as string }),
                            userConnected({nom:_userdata.nom as string }),
                         );
                        } else{
                            return of(showToast({ severity: 'error', summary: 'Oups !', detail: 'Vérifiez vos informations!', life: 10000 }))
                        }
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: 'Vérifiez vos informations!', life: 10000 })))
                )
            })
        )
    );

    _userregister = createEffect(() => 
        this.action$.pipe(
            ofType(beginRegister),
            exhaustMap((action) => {
                return this.service.UserRegistration(action.userdata).pipe(
                    switchMap(() => {
                        return of(
                            getUtilisateurs(),
                            showToast({ severity: 'success', summary: 'Succès', detail: 'Nouvel utilisateur enrégistré!', life: 10000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                )
            })
        )
    );



    _loadmenubyrole = createEffect(() =>
        this.action$.pipe(
            ofType(fetchmenu),
            exhaustMap((action) => {
                return this.service.GetMenuList(action.userrole).pipe(
                    map((data) => {
                        return fetchmenusuccess({ menulist: data })
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: "Erreur dans la récupération du menu", life: 5000 })))
                )
            })
        )
    )

    _updateUtilisateur = createEffect(() =>
        this.action$.pipe(
            ofType(updateUtilisateur),
            switchMap((action) => {
                return this.service.UserUpdate(action.credentials.id as string, action.credentials).pipe(
                    switchMap((data) => {
                        return of(
                        showToast({ severity: 'success', summary: 'Succès !', detail: 'Mise à jour du profil réussit!', life: 10000 }),
                        updateUtilisateurSuccess({ credentials: action.credentials }),
                        userConnectedSuccess({userConnected: data}))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })
                ))
                )
            })
        )
    )

    _updateUtilisateurByAdmin = createEffect(() =>
        this.action$.pipe(
            ofType(updateUtilisateurByAdmin),
            switchMap((action) => {
                return this.service.UserUpdateByAdmin(action.credentials).pipe(
                    switchMap((data) => {
                        return of(
                        showToast({ severity: 'success', summary: 'Succès !', detail: 'Mise à jour du profil réussit!', life: 10000 }),
                        updateUtilisateurByAdminSuccess({ credentials: action.credentials }),
                        getUtilisateurs())
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })
                ))
                )
            })
        )
    )

    _updateUserPhoto = createEffect(() =>
        this.action$.pipe(
            ofType(updateUserPhoto),
            switchMap((action) => {
                return this.service.UserUpdatePhoto(action.credentials.id as string, action.credentials).pipe(
                    switchMap((data) => {
                        return of(
                        showToast({ severity: 'success', summary: 'Succès !', detail: 'Mise à jour du profil réussit!', life: 5000 }),
                        updateUtilisateurSuccess({ credentials: action.credentials }),
                        userConnectedSuccess({userConnected: data}))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: '', detail: _error.error.message, life: 5000 })
                ))
                )
            })
        )
    )

    _passwordReset = createEffect(() =>
        this.action$.pipe(
            ofType(passwordReset),
            switchMap((action) => {
                return this.service.UserChangePassword(action.credentials).pipe(
                    switchMap(() => {
                        return of(showToast({ severity: 'success', summary: 'Succès !', detail: 'Mot de passe modifié!', life: 5000 }), passwordResetSuccess())
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _deleteUser = createEffect(() =>
        this.action$.pipe(
            ofType(deleteUtilisateur),
            switchMap((action) => {
                return this.service.UserDelete(action.id).pipe(
                    switchMap(() => {
                        return of(
                            getUtilisateurs(),
                            showToast({ severity: 'success', summary: 'Succès !', detail: 'Utilisateur supprimé!', life: 5000 }), passwordResetSuccess())
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    // // _getoneuser = createEffect(() =>
    // //     this.action$.pipe(
    // //         ofType(getoneuser),
    // //         exhaustMap((action) => {
    // //             return this.service.UserConnected().pipe(
    // //                 map((data) => {
    // //                     console.log("VALEUR DE DATA ", data);
    // //                     return getusersuccess({ userInfo: data[0] });
    // //                 }),
    // //                 catchError((_error) => of(showToast({ severity: 'error', summary: '', detail: _error.error.message, life: 5000 }), loadspinner({isLoader: false})))
    // //             )
    // //         })
    // //     )
    // // )

    // // _loadUser$ = createEffect(() =>
    // //     this.action$.pipe(
    // //       ofType(utilisateur),
    // //       switchMap((action) =>
    // //         this.service.utilisaterConnected(action.email).pipe(
    // //             map((user) => {
    // //                 return utilisateurConnected({ utilisateur: user });
    // //               }),
    // //           catchError((_error) => of(showToast({ severity: 'error', summary: '', detail: _error.error.message, life: 5000 }), loadspinner({isLoader: false})))
    // //         )
    // //       )
    // //     )
    // //   );

    _getallusers = createEffect(() =>
        this.action$.pipe(
            ofType(getUtilisateurs),
            exhaustMap((action) => {
                return this.service.GetUsers().pipe(
                    map((data) => {
                        return getUtilisateursSuccess({ userlist: data })
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups! ', detail: "Vous n'êtes pas authorisé à effectuer cette action.", life: 5000 })))
                )
            })
        )
    )

}

