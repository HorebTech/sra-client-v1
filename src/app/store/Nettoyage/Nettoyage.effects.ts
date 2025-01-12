import { inject, Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { showToast } from "../Common/App.action";
import { deleteNettoyage, deleteNettoyageChoisie, deleteNettoyageSuccess, getAllNettoyages, getAllNettoyagesChoisies, getAllNettoyagesChoisiesFail, getAllNettoyagesChoisiesSuccess, getAllNettoyagesFail, getAllNettoyagesSuccess, getNettoyage, getNettoyageChoisie, getNettoyageChoisieSuccess, getNettoyageSuccess, saveNettoyage, saveNettoyageChoisie, updateNettoyage, updateNettoyageSuccess } from "./Nettoyage.action";
import { NettoyageController } from "../../services/nettoyage/Nettoyage.controller.service";
import { NettoyageChoisieController } from "../../services/nettoyage/NettoyageChoisie.controller.service";
import { getAllChambresChoisie } from "../Chambre/Chambre.action";

@Injectable()
export class NettoyageEffects {

        service = inject(NettoyageController);
        serviceNettoyageChoisie = inject(NettoyageChoisieController);
        action$ = inject(Actions);

    _saveNettoyage = createEffect(() =>
        this.action$.pipe(
            ofType(saveNettoyage),
            switchMap((action) => {
                return this.service.Create(action.credential).pipe(
                    switchMap((data) => {
                        return of(getAllNettoyages(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Nouveau nettoyage ajouté!", life: 10000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _getNettoyage = createEffect(() =>
        this.action$.pipe(
            ofType(getNettoyage),
            switchMap((action) => {
                return this.service.Get(action.id).pipe(
                    switchMap((data) => {
                        return of(getNettoyageSuccess({ nettoyage: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _getNettoyages = createEffect(() =>
        this.action$.pipe(
            ofType(getAllNettoyages),
            switchMap((action) => {
                return this.service.Gets().pipe(
                    switchMap((data) => {
                        return of(getAllNettoyagesSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getAllNettoyagesFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _updateNettoyage = createEffect(() =>
        this.action$.pipe(
            ofType(updateNettoyage),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(getAllNettoyages(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Mise à jour réussie!", life: 10000 }))
                    }),
                    catchError((_error) => of(getAllNettoyagesFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _deleteNettoyage = createEffect(() =>
        this.action$.pipe(
            ofType(deleteNettoyage),
            switchMap((action) => {
                return this.service.Delete(action.id).pipe(
                    switchMap((data) => {
                        return of(getAllNettoyages(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Suppression réussie!", life: 10000 }))
                    }),
                    catchError((_error) => of(getAllNettoyagesFail({errormessage: _error.error.message})))
                )
            })
        )
    )



    /************************************************************************************************** */
        /*                                         NETTOYAGE CHOISIE                                          */
        /************************************************************************************************** */
    
        _saveNettoyageChoisie = createEffect(() =>
            this.action$.pipe(
                ofType(saveNettoyageChoisie),
                switchMap((action) => {
                    return this.serviceNettoyageChoisie.Create(action.credential).pipe(
                        switchMap((data) => {
                            return of(getAllNettoyages())
                        }),
                        catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                    )
                })
            )
        )
    
        _getAllNettoyagesChoisie = createEffect(() =>
            this.action$.pipe(
                ofType(getAllNettoyagesChoisies),
                switchMap((action) => {
                    return this.serviceNettoyageChoisie.Gets().pipe(
                        switchMap((data) => {
                            return of(getAllNettoyagesSuccess({ result: data }))
                        }),
                        catchError((_error) => of(getAllNettoyagesChoisiesFail({errormessage: _error.error.message})))
                    )
                })
            )
        );
    
        _getNettoyageChoisie = createEffect(() =>
            this.action$.pipe(
                ofType(getNettoyageChoisie),
                switchMap((action) => {
                    return this.serviceNettoyageChoisie.Get(action.id).pipe(
                        switchMap((data) => {
                            return of(getNettoyageChoisieSuccess({ nettoyageChoisie: data }))
                        }),
                        catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                    )
                })
            )
        )
    
        _deleteNettoyageChoisie = createEffect(() =>
            this.action$.pipe(
                ofType(deleteNettoyageChoisie),
                switchMap((action) => {
                    return this.serviceNettoyageChoisie.Delete(action.id).pipe(
                        switchMap((data) => {
                            return of(showToast({ severity: 'success', summary: 'Succès !', detail: "Suppression réussie!", life: 10000 }))
                        }),
                        catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                    )
                })
            )
        )
    }
    

