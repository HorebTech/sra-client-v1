import { inject, Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { showToast } from "../Common/App.action";
import { deleteTache, deleteTacheChoisie, deleteTacheSuccess, getAllTaches, getAllTachesChoisies, getAllTachesChoisiesFail, getAllTachesChoisiesSuccess, getAllTachesFail, getAllTachesSuccess, getTache, getTacheChoisie, getTacheChoisieSuccess, getTacheSuccess, saveTache, saveTacheChoisie, updateTache, updateTacheSuccess } from "./Tache.action";
import { TacheController } from "../../services/tache/Tache.controller.service";
import { TacheChoisieController } from "../../services/tache/TacheChoisie.controller.service";
import { getAllChambresChoisie } from "../Chambre/Chambre.action";

@Injectable()
export class TacheEffects {

        service = inject(TacheController);
        serviceTacheChoisie = inject(TacheChoisieController);
        action$ = inject(Actions);

    _saveTache = createEffect(() =>
        this.action$.pipe(
            ofType(saveTache),
            switchMap((action) => {
                return this.service.Create(action.credential).pipe(
                    switchMap((data) => {
                        return of(getAllTaches(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Nouvelle tâche ajouté!", life: 10000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _getTache = createEffect(() =>
        this.action$.pipe(
            ofType(getTache),
            switchMap((action) => {
                return this.service.Get(action.id).pipe(
                    switchMap((data) => {
                        return of(getTacheSuccess({ tache: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _getTaches = createEffect(() =>
        this.action$.pipe(
            ofType(getAllTaches),
            switchMap((action) => {
                return this.service.Gets().pipe(
                    switchMap((data) => {
                        return of(getAllTachesSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getAllTachesFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _updateTache = createEffect(() =>
        this.action$.pipe(
            ofType(updateTache),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(getAllTaches(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Mise à jour réussie!", life: 10000 }))
                    }),
                    catchError((_error) => of(getAllTachesFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _deleteTache = createEffect(() =>
        this.action$.pipe(
            ofType(deleteTache),
            switchMap((action) => {
                return this.service.Delete(action.id).pipe(
                    switchMap((data) => {
                        return of(getAllTaches(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Suppression réussit!", life: 10000 }))
                    }),
                    catchError((_error) => of(getAllTachesFail({errormessage: _error.error.message})))
                )
            })
        )
    )



    /************************************************************************************************** */
        /*                                         TACHE CHOISIE                                          */
        /************************************************************************************************** */
    
        _saveTacheChoisie = createEffect(() =>
            this.action$.pipe(
                ofType(saveTacheChoisie),
                switchMap((action) => {
                    return this.serviceTacheChoisie.Create(action.credential).pipe(
                        switchMap((data) => {
                            return of(getAllTaches())
                        }),
                        catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                    )
                })
            )
        )
    
        _getAllTachesChoisie = createEffect(() =>
            this.action$.pipe(
                ofType(getAllTachesChoisies),
                switchMap((action) => {
                    return this.serviceTacheChoisie.Gets().pipe(
                        switchMap((data) => {
                            return of(getAllTachesSuccess({ result: data }))
                        }),
                        catchError((_error) => of(getAllTachesChoisiesFail({errormessage: _error.error.message})))
                    )
                })
            )
        );
    
        _getTacheChoisie = createEffect(() =>
            this.action$.pipe(
                ofType(getTacheChoisie),
                switchMap((action) => {
                    return this.serviceTacheChoisie.Get(action.id).pipe(
                        switchMap((data) => {
                            return of(getTacheChoisieSuccess({ tacheChoisie: data }))
                        }),
                        catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                    )
                })
            )
        )
    
        _deleteTacheChoisie = createEffect(() =>
            this.action$.pipe(
                ofType(deleteTacheChoisie),
                switchMap((action) => {
                    return this.serviceTacheChoisie.Delete(action.id).pipe(
                        switchMap((data) => {
                            return of(showToast({ severity: 'success', summary: 'Succès !', detail: "Suppression réussie!", life: 10000 }))
                        }),
                        catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                    )
                })
            )
        )
    }
    

