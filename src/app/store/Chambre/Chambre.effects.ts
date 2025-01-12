import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { deleteChambre, deleteChambreChoisie, getAllChambres, getAllChambresByState, getAllChambresByStateSuccess, getAllChambresChoisie, getAllChambresChoisieSuccess, getAllChambresEnNettoyages, getAllChambresEnNettoyagesSuccess, getAllChambresPropres, getAllChambresPropresSuccess, getAllChambresSuccess, getChambre, getChambreChoisie, getChambreChoisieSuccess, getChambresFail, getChambreSuccess, saveChambre, saveChambreChoisie, updateChambre, updateChambreChoisie, updateChambreChoisieSuccess, updateChambreState, updateChambreSuccess } from "./Chambre.action";
import { ChambreController } from "../../services/chambre/Chambre.controller.service";
import { ChambreChoisieController } from "../../services/chambre/ChambreChoisie.controller.service";
import { showToast } from "../Common/App.action";

@Injectable()
export class ChambreEffects {

        serviceChambre = inject(ChambreController);
        serviceChambreChoisie = inject(ChambreChoisieController);
        action$ = inject(Actions);

    _saveChambre = createEffect(() =>
        this.action$.pipe(
            ofType(saveChambre),
            switchMap((action) => {
                return this.serviceChambre.Create(action.credentials).pipe(
                    switchMap((data) => {
                        return of(getAllChambres(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Nouvelle chambre créée!", life: 10000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                )
            })
        )
    )

    _getChambre = createEffect(() =>
        this.action$.pipe(
            ofType(getChambre),
            switchMap((action) => {
                return this.serviceChambre.Get(action.id).pipe(
                    switchMap((data) => {
                        return of(getChambreSuccess({ chambre: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                )
            })
        )
    )

    _getAllChambre = createEffect(() =>
        this.action$.pipe(
            ofType(getAllChambres),
            switchMap((action) => {
                return this.serviceChambre.Gets().pipe(
                    switchMap((data) => {
                        return of(getAllChambresSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getChambresFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _getAllChambresByState = createEffect(() =>
        this.action$.pipe(
            ofType(getAllChambresByState),
            switchMap((action) => {
                return this.serviceChambre.GetByState(action.etat).pipe(
                    switchMap((data) => {
                        return of(getAllChambresByStateSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getChambresFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _getAllChambresPropres = createEffect(() =>
        this.action$.pipe(
            ofType(getAllChambresPropres),
            switchMap((action) => {
                return this.serviceChambre.GetByState(action.etat).pipe(
                    switchMap((data) => {
                        return of(getAllChambresPropresSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getChambresFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _getAllChambresEnNettoyage = createEffect(() =>
        this.action$.pipe(
            ofType(getAllChambresEnNettoyages),
            switchMap((action) => {
                return this.serviceChambre.GetByState(action.etat).pipe(
                    switchMap((data) => {
                        return of(getAllChambresEnNettoyagesSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getChambresFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _updateChambre = createEffect(() =>
        this.action$.pipe(
            ofType(updateChambre),
            switchMap((action) => {
                return this.serviceChambre.Update(action.credentials).pipe(
                    switchMap((data) => {
                        return of(
                            showToast({ severity: 'success', summary: 'Succès !', detail: "Mise à jour effectée!", life: 5000 }),
                            getAllChambres(), updateChambreSuccess({ chambre: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 }), getChambresFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _updateChambreState = createEffect(() =>
        this.action$.pipe(
            ofType(updateChambreState),
            switchMap((action) => {
                return this.serviceChambre.UpdateState(action.id, action.etat).pipe(
                    switchMap((data) => {
                        return of(getAllChambres(), 
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Vous avez modifié l'état de la chambre avec succès!", life: 10000 }),
                        getAllChambres())
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 }), getChambresFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _deleteChambre = createEffect(() =>
        this.action$.pipe(
            ofType(deleteChambre),
            switchMap((action) => {
                return this.serviceChambre.Delete(action.id).pipe(
                    switchMap((data) => {
                        return of(getAllChambres(), showToast({ severity: 'success', summary: 'Succès !', detail: "Suppression réussie!", life: 10000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    /************************************************************************************************** */
    /*                                         CHAMBRE CHOISIE                                          */
    /************************************************************************************************** */

    _saveChambreChoisie = createEffect(() =>
        this.action$.pipe(
            ofType(saveChambreChoisie),
            switchMap((action) => {
                return this.serviceChambreChoisie.Create(action.credentials).pipe(
                    switchMap((data) => {
                        return of(getAllChambresChoisie())
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                )
            })
        )
    )

    _getAllChambresChoisie = createEffect(() =>
        this.action$.pipe(
            ofType(getAllChambresChoisie),
            switchMap((action) => {
                return this.serviceChambreChoisie.Gets().pipe(
                    switchMap((data) => {
                        return of(getAllChambresChoisieSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getChambresFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _getChambreChoisie = createEffect(() =>
        this.action$.pipe(
            ofType(getChambreChoisie),
            switchMap((action) => {
                return this.serviceChambreChoisie.Get(action.id).pipe(
                    switchMap((data) => {
                        return of(getChambreChoisieSuccess({ chambreChoisie: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                )
            })
        )
    )

    _updateChambreChoisie = createEffect(() =>
        this.action$.pipe(
            ofType(updateChambreChoisie),
            switchMap((action) => {
                return this.serviceChambreChoisie.UpdateState(action.id, action.credentials).pipe(
                    switchMap((data) => {
                        return of(updateChambreChoisieSuccess({ chambreChoisie: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000}), getChambresFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _deleteChambreChoisie = createEffect(() =>
        this.action$.pipe(
            ofType(deleteChambreChoisie),
            switchMap((action) => {
                return this.serviceChambreChoisie.Delete(action.id).pipe(
                    switchMap((data) => {
                        return of(showToast({ severity: 'success', summary: 'Succès !', detail: "Suppression réussie!", life: 10000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )
}
