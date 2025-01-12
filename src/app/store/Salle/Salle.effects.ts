import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { deleteSalle, deleteSalleChoisie, getAllSalles, getAllSallesByState, getAllSallesByStateSuccess, getAllSallesChoisie, getAllSallesChoisieSuccess, getAllSallesEnNettoyage, getAllSallesEnNettoyageSuccess, getAllSallesPropres, getAllSallesPropresSuccess, getAllSallesSuccess, getSalle, getSalleChoisie, getSalleChoisieSuccess, getSallesFail, getSalleSuccess, saveSalle, saveSalleChoisie, updateSalle, updateSalleChoisie, updateSalleChoisieSuccess, updateSalleState, updateSalleSuccess } from "./Salle.action";
import { SalleController } from "../../services/salle/Salle.controller.service";
import { SalleChoisieController } from "../../services/salle/SalleChoisie.controller.service";
import { showToast } from "../Common/App.action";

@Injectable()
export class SalleEffects {

    serviceSalle = inject(SalleController);
    serviceSalleChoisie = inject(SalleChoisieController);
    action$ = inject(Actions);

    _saveSalle = createEffect(() =>
        this.action$.pipe(
            ofType(saveSalle),
            switchMap((action) => {
                return this.serviceSalle.Create(action.credentials).pipe(
                    switchMap((data) => {
                        return of(getAllSalles(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Nouvelle salle ajoutée!", life: 10000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                )
            })
        )
    )

    _getSalle = createEffect(() =>
        this.action$.pipe(
            ofType(getSalle),
            switchMap((action) => {
                return this.serviceSalle.Get(action.id).pipe(
                    switchMap((data) => {
                        return of(getSalleSuccess({ salle: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _getAllSalle = createEffect(() =>
        this.action$.pipe(
            ofType(getAllSalles),
            switchMap((action) => {
                return this.serviceSalle.Gets().pipe(
                    switchMap((data) => {
                        return of(getAllSallesSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getSallesFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _getAllSallesByState = createEffect(() =>
        this.action$.pipe(
            ofType(getAllSallesByState),
            switchMap((action) => {
                return this.serviceSalle.GetByState(action.etat).pipe(
                    switchMap((data) => {
                        return of(getAllSallesByStateSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getSallesFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _getAllSallesPropres = createEffect(() =>
        this.action$.pipe(
            ofType(getAllSallesPropres),
            switchMap((action) => {
                return this.serviceSalle.GetByState(action.etat).pipe(
                    switchMap((data) => {
                        return of(getAllSallesPropresSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getSallesFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _getAllSallesEnNettoyage = createEffect(() =>
        this.action$.pipe(
            ofType(getAllSallesEnNettoyage),
            switchMap((action) => {
                return this.serviceSalle.GetByState(action.etat).pipe(
                    switchMap((data) => {
                        return of(getAllSallesEnNettoyageSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getSallesFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _updateSalle = createEffect(() =>
        this.action$.pipe(
            ofType(updateSalle),
            switchMap((action) => {
                return this.serviceSalle.Update(action.credentials).pipe(
                    switchMap((data) => {
                        return of(
                            showToast({ severity: 'success', summary: 'Succès !', detail: "Mise à jour effectée!", life: 10000 }),
                            getAllSalles(), updateSalleSuccess({ salle: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 }), getSallesFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _updateSalleState = createEffect(() =>
        this.action$.pipe(
            ofType(updateSalleState),
            switchMap((action) => {
                return this.serviceSalle.UpdateState(action.id, action.etat).pipe(
                    switchMap((data) => {
                        return of(getAllSalles(), updateSalleSuccess({ salle: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 }), getSallesFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _deleteSalle = createEffect(() =>
        this.action$.pipe(
            ofType(deleteSalle),
            switchMap((action) => {
                return this.serviceSalle.Delete(action.id).pipe(
                    switchMap((data) => {
                        return of(getAllSalles(), showToast({ severity: 'success', summary: 'Succès !', detail: "Suppression réussie!", life: 10000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    /************************************************************************************************** */
    /*                                         CHAMBRE CHOISIE                                          */
    /************************************************************************************************** */

    _saveSalleChoisie = createEffect(() =>
        this.action$.pipe(
            ofType(saveSalleChoisie),
            switchMap((action) => {
                return this.serviceSalleChoisie.Create(action.credentials).pipe(
                    switchMap((data) => {
                        return of(getAllSallesChoisie(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Nouvelle salle ajoutée!", life: 5000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                )
            })
        )
    )

    _getAllSallesChoisie = createEffect(() =>
        this.action$.pipe(
            ofType(getAllSallesChoisie),
            switchMap((action) => {
                return this.serviceSalleChoisie.Gets().pipe(
                    switchMap((data) => {
                        return of(getAllSallesChoisieSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getSallesFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _getSalleChoisie = createEffect(() =>
        this.action$.pipe(
            ofType(getSalleChoisie),
            switchMap((action) => {
                return this.serviceSalleChoisie.Get(action.id).pipe(
                    switchMap((data) => {
                        return of(getSalleChoisieSuccess({ salleChoisie: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _updateSalleChoisie = createEffect(() =>
        this.action$.pipe(
            ofType(updateSalleChoisie),
            switchMap((action) => {
                return this.serviceSalleChoisie.Update(action.id, action.credentials).pipe(
                    switchMap((data) => {
                        return of(updateSalleChoisieSuccess({ salleChoisie: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 }), getSallesFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _deleteSalleChoisie = createEffect(() =>
        this.action$.pipe(
            ofType(deleteSalleChoisie),
            switchMap((action) => {
                return this.serviceSalleChoisie.Delete(action.id).pipe(
                    switchMap((data) => {
                        return of(showToast({ severity: 'success', summary: 'Succès !', detail: "Suppression réussie!", life: 5000 }),)
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )
}
