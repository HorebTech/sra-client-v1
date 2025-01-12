import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { MarqueController } from "../../services/marque/Marque.controller.service";
import { createMarque, deleteMarque, deleteMarqueSuccess, getMarqueOne, getMarqueOneSuccess, getMarques, getMarquesFail, getMarquesSuccess, updateMarque, updateMarqueSuccess } from "./Marque.action";
import { showToast } from "../Common/App.action";

@Injectable()
export class MarqueEffects {

    service = inject(MarqueController);
    action$ = inject(Actions);

    _createMarque = createEffect(() =>
        this.action$.pipe(
            ofType(createMarque),
            switchMap((action) => {
                return this.service.Create(action.credential).pipe(
                    switchMap((data) => {
                        return of(getMarques(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Nouvelle marque ajoutée!", life: 10000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _getMarqueOne = createEffect(() =>
        this.action$.pipe(
            ofType(getMarqueOne),
            switchMap((action) => {
                return this.service.Get(action.id).pipe(
                    switchMap((data) => {
                        return of(getMarqueOneSuccess({ result: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _getMarques = createEffect(() =>
        this.action$.pipe(
            ofType(getMarques),
            switchMap((action) => {
                return this.service.Gets().pipe(
                    switchMap((data) => {
                        return of(getMarquesSuccess({ result: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.message, life: 10000 })))
                )
            })
        )
    );

    _updateMarque = createEffect(() =>
        this.action$.pipe(
            ofType(updateMarque),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateMarqueSuccess({ inputdata: action.inputdata }),
                        getMarques(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Mise à jour réussie!", life: 5000 }))
                    }),
                    catchError((_error) => of(getMarquesFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _deleteMarque = createEffect(() =>
        this.action$.pipe(
            ofType(deleteMarque),
            switchMap((action) => {
                return this.service.Delete(action.id).pipe(
                    switchMap((data) => {
                        return of(deleteMarqueSuccess({ id: action.id }),
                        getMarques(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Suppression réussie!", life: 5000 }))
                    }),
                    catchError((_error) => of(getMarquesFail({errormessage: _error.error.message})))
                )
            })
        )
    )

}