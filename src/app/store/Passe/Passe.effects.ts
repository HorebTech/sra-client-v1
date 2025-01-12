import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { PasseController } from "../../services/passe/Passe.controller.service";
import { showToast } from "../Common/App.action";
import { deletePasse, findCurrentPasses, findCurrentPassesSuccess, findGlobalPasses, findGlobalPassesFail, findGlobalPassesSuccess, findNewAndCurrentPasses, findNewAndCurrentPassesSuccess, findNewPasses, findNewPassesSuccess, findPasseOne, findPasseOneSuccess, findPassesByStateAndDate, findPassesByStateAndDateSuccess, findUserPasses, findUserPassesSuccess, updatePasseState } from "./Passe.action";

@Injectable()
export class PasseEffects {

    action$ = inject(Actions);
    service = inject(PasseController);

    _loadPasses = createEffect(() =>
        this.action$.pipe(
            ofType(findGlobalPasses),
            switchMap((action) => {
                return this.service.Gets().pipe(
                    switchMap((data) => {
                        return of(findGlobalPassesSuccess({ globalPasses: data }))
                    }),
                    catchError((_error) => of(findGlobalPassesFail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getUserPasses = createEffect(() =>
        this.action$.pipe(
            ofType(findUserPasses),
            switchMap((action) => {
                return this.service.GetByUserByState(action.nom, action.agent).pipe(
                    switchMap((data) => {
                        return of(findUserPassesSuccess({ userPasses: data }))
                    }),
                    catchError((_error) => of(findGlobalPassesFail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getUserPassesByDateAndState = createEffect(() =>
        this.action$.pipe(
            ofType(findPassesByStateAndDate),
            switchMap((action) => {
                return this.service.GetByStateByDateByUser(action.nom, action.agent, action.date).pipe(
                    switchMap((data) => {
                        return of(findPassesByStateAndDateSuccess({ userPassesDay: data }))
                    }),
                    catchError((_error) => of(findGlobalPassesFail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getNouveauxPasses = createEffect(() =>
        this.action$.pipe(
            ofType(findNewPasses),
            switchMap((action) => {
                return this.service.GetByState(action.nom).pipe(
                    switchMap((data) => {
                        return of(findNewPassesSuccess({ result: data }))
                    }),
                    catchError((_error) => of(findGlobalPassesFail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getPassesEnCours = createEffect(() =>
        this.action$.pipe(
            ofType(findCurrentPasses),
            switchMap((action) => {
                return this.service.GetByState(action.nom).pipe(
                    switchMap((data) => {
                        return of(findCurrentPassesSuccess({ result: data }))
                    }),
                    catchError((_error) => of(findGlobalPassesFail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getPassesNouveauEtEnCours = createEffect(() =>
        this.action$.pipe(
            ofType(findNewAndCurrentPasses),
            switchMap((action) => {
                return this.service.GetCurrent(action.agent, action.date).pipe(
                    switchMap((data) => {
                        return of(findNewAndCurrentPassesSuccess({ newsPassesActifs: data }))
                    }),
                    catchError((_error) => of(findGlobalPassesFail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getPasse = createEffect(() =>
        this.action$.pipe(
            ofType(findPasseOne),
            switchMap((action) => {
                return this.service.Get(action.id).pipe(
                    switchMap((data) => {
                        return of(findPasseOneSuccess({ passe: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                )
            })
        )
    )

    _deletePasse = createEffect(() =>
        this.action$.pipe(
            ofType(deletePasse),
            switchMap((action) => {
                return this.service.Delete(action.id).pipe(
                    switchMap((data) => {
                        return of(showToast({ severity: 'success', summary: 'Succès !', detail: "Suppression réussie!", life: 10000 }),
                        findGlobalPasses())
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                )
            })
        )
    )

    _updatePasseState = createEffect(() =>
        this.action$.pipe(
            ofType(updatePasseState),
            switchMap((action) => {
                return this.service.UpdateState(action.passeId, action.nom).pipe(
                    switchMap((data) => {
                        return of()
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 10000 })))
                )
            })
        )
    )


}