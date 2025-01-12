import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { createStatut, deleteStatut, deleteStatutSuccess, getStatutOne, getStatutOneSuccess, getStatuts, getStatutsFail, getStatutsSuccess, updateStatut, updateStatutSuccess } from "./Statut.action";
import { showToast } from "../Common/App.action";
import { StatutController } from "../../services/statut/Statut.controller.service";

@Injectable()
export class StatutEffects {
    service = inject(StatutController);
    action$ = inject(Actions);

    _createStatut = createEffect(() =>
        this.action$.pipe(
            ofType(createStatut),
            switchMap((action) => {
                return this.service.Create(action.credential).pipe(
                    switchMap((data) => {
                        return of(getStatuts(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Nouvel état créé!", life: 10000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                )
            })
        )
    )

    _getStatutOne = createEffect(() =>
        this.action$.pipe(
            ofType(getStatutOne),
            switchMap((action) => {
                return this.service.Get(action.id).pipe(
                    switchMap((data) => {
                        return of(getStatutOneSuccess({ result: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _getStatuts = createEffect(() =>
        this.action$.pipe(
            ofType(getStatuts),
            switchMap((action) => {
                return this.service.Gets().pipe(
                    switchMap((data) => {
                        return of(getStatutsSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getStatutsFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _updateStatut = createEffect(() =>
        this.action$.pipe(
            ofType(updateStatut),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateStatutSuccess({ inputdata: action.inputdata }),
                        getStatuts(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Mise à jour réussie!", life: 5000 }))
                    }),
                    catchError((_error) => of(getStatutsFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _deleteStatut = createEffect(() =>
        this.action$.pipe(
            ofType(deleteStatut),
            switchMap((action) => {
                return this.service.Delete(action.id).pipe(
                    switchMap((data) => {
                        return of(deleteStatutSuccess({ id: action.id }),
                        getStatuts(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Suppression réussie!", life: 20000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 20000 })))
                )
            })
        )
    )

}