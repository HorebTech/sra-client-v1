import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { showToast } from "../Common/App.action";
import { deleteObjet, getAllObjets, getAllObjetsByStateAndOther, getAllObjetsByStateAndOtherSuccess, getObjet, getObjetsFail, getObjetsSuccess, getObjetSuccess, saveObjet, updateObjet, updateObjetState } from "./Objet.action";
import { ObjetController } from "../../services/objet/Objet.controller.service";

@Injectable()
export class ObjetEffects {
        action$ = inject(Actions);
        service = inject(ObjetController);

    _saveObjet = createEffect(() =>
        this.action$.pipe(
            ofType(saveObjet),
            switchMap((action) => {
                return this.service.Create(action.credentials).pipe(
                    switchMap((data) => {
                        const statut: string = data.statut?.nom as string;
                        let numero: any | undefined;
                        if(data.chambreChoisie != null) {
                            numero = data.chambreChoisie?.chambre?.numero as string;
                        } else if(data.salleChoisie != null) {
                            numero = data.salleChoisie?.salle?.numero as string;
                        }
                        return of(getAllObjetsByStateAndOther({statut, numero}),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Un nouvel objet découvert!", life: 5000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _getObjet = createEffect(() =>
        this.action$.pipe(
            ofType(getObjet),
            switchMap((action) => {
                return this.service.Get(action.id).pipe(
                    switchMap((data) => {
                        return of(getObjetSuccess({ objet: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    );

    _getObjetByStateAndRoom = createEffect(() =>
        this.action$.pipe(
            ofType(getAllObjetsByStateAndOther),
            switchMap((action) => {
                return this.service.GetsByStateAndOther(action.statut, action.numero).pipe(
                    switchMap((data) => {
                        return of(getAllObjetsByStateAndOtherSuccess({ objetsByStateOther: data }))
                    }),
                    catchError((_error) => of(getObjetsFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _getObjets = createEffect(() =>
        this.action$.pipe(
            ofType(getAllObjets),
            switchMap((action) => {
                return this.service.Gets().pipe(
                    switchMap((data) => {
                        return of(getObjetsSuccess({globalObjets: data}))
                    }),
                    catchError((_error) => of(getObjetsFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _updateObjet = createEffect(() =>
        this.action$.pipe(
            ofType(updateObjet),
            switchMap((action) => {
                return this.service.Update(action.credentials).pipe(
                    switchMap((data) => {
                        return of(getObjetSuccess({ objet: data }),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Modification réussit!", life: 10000 }),
                        getAllObjets())
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 }), getObjetsFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _updateObjetStatut = createEffect(() =>
        this.action$.pipe(
            ofType(updateObjetState),
            switchMap((action) => {
                return this.service.UpdateState(action.id, action.statut).pipe(
                    switchMap((data) => {
                        return of(getObjetSuccess({ objet: data }),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Modification réussit!", life: 10000 }),
                        getAllObjets())
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 }), getObjetsFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _deleteObjet = createEffect(() =>
        this.action$.pipe(
            ofType(deleteObjet),
            switchMap((action) => {
                return this.service.Delete(action.id).pipe(
                    switchMap((data) => {
                        const statut: string = data.statut?.nom as string;
                        let numero: any | undefined;
                        if(data.chambreChoisie != null) {
                            numero = data.chambreChoisie?.chambre?.numero as string;
                        } else if(data.salleChoisie != null) {
                            numero = data.salleChoisie?.salle?.numero as string;
                        }
                        return of(showToast({ severity: 'success', summary: 'Succès !', detail: "Suppression réussit!", life: 5000 }),
                        getAllObjetsByStateAndOther({statut, numero}),
                        getAllObjets())
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

}
