import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { showToast } from "../Common/App.action";
import { counterByMarque, counterByMarqueSuccess, deletePanne, getAllPannes, getAllPannesByDates, getAllPannesByDatesSuccess, getAllPannesByDay, getAllPannesByDaySuccess, getAllPannesByStateAndOther, getAllPannesByStateAndOtherSuccess, getPanne, getPannesFail, getPannesInRoom, getPannesInRoomSuccess, getPannesSuccess, getPanneSuccess, savePanne, updatePanne, updatePanneState } from "./Panne.action";
import { PanneController } from "../../services/panne/Panne.controller.service";
import { getObjetsFail } from "../Objet/Objet.action";

@Injectable()
export class PanneEffects {

        action$ = inject(Actions);
        service = inject(PanneController);


    _savePanne = createEffect(() =>
        this.action$.pipe(
            ofType(savePanne),
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
                        return of(getAllPannesByStateAndOther({statut, numero}),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Un nouvel panne découverte!", life: 5000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _getPanne = createEffect(() =>
        this.action$.pipe(
            ofType(getPanne),
            switchMap((action) => {
                return this.service.Get(action.id).pipe(
                    switchMap((data) => {
                        return of(getPanneSuccess({ panne: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _getPannesByDay = createEffect(() =>
        this.action$.pipe(
            ofType(getAllPannesByDay),
            switchMap((action) => {
                return this.service.GetsByDay(action.date).pipe(
                    switchMap((data) => {
                        return of(getAllPannesByDaySuccess({ result: data }))
                    }),
                    catchError((_error) => of(getPannesFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _getPanneByStateAndOther = createEffect(() =>
        this.action$.pipe(
            ofType(getAllPannesByStateAndOther),
            switchMap((action) => {
                return this.service.GetsByStateAndOther(action.statut, action.numero).pipe(
                    switchMap((data) => {
                        return of(getAllPannesByStateAndOtherSuccess({ pannesByStateAndOther: data }))
                    }),
                    catchError((_error) => of(getObjetsFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _counterByMarque = createEffect(() =>
        this.action$.pipe(
            ofType(counterByMarque),
            switchMap((action) => {
                return this.service.CounterByMarque().pipe(
                    switchMap((data) => {
                        return of(counterByMarqueSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getPannesFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _getAllPannesByDates = createEffect(() =>
        this.action$.pipe(
            ofType(getAllPannesByDates),
            switchMap((action) => {
                return this.service.GetsByDates(action.dateDebut, action.dateFin).pipe(
                    switchMap((data) => {
                        return of(getAllPannesByDatesSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getPannesFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _getPannesInRoom = createEffect(() =>
        this.action$.pipe(
            ofType(getPannesInRoom),
            switchMap((action) => {
                return this.service.GetRoomByDates(action.dateDebut, action.dateFin).pipe(
                    switchMap((data) => {
                        return of(getPannesInRoomSuccess({ result: data }))
                    }),
                    catchError((_error) => of(getPannesFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _getPannes = createEffect(() =>
        this.action$.pipe(
            ofType(getAllPannes),
            switchMap((action) => {
                return this.service.Gets().pipe(
                    switchMap((data) => {
                        return of(getPannesSuccess({globalPannes: data}))
                    }),
                    catchError((_error) => of(getPannesFail({errormessage: _error.error.message})))
                )
            })
        )
    );

    _updatePanne = createEffect(() =>
        this.action$.pipe(
            ofType(updatePanne),
            switchMap((action) => {
                return this.service.Update(action.credentials).pipe(
                    switchMap((data) => {
                        return of(getPanneSuccess({ panne: data }),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Modification réussit!", life: 5000 }),
                        getAllPannes())
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 }), getPannesFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _updatePanneStatut = createEffect(() =>
        this.action$.pipe(
            ofType(updatePanneState),
            switchMap((action) => {
                return this.service.UpdateState(action.id, action.statut).pipe(
                    switchMap((data) => {
                        return of(getPanneSuccess({ panne: data }),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Modification réussit!", life: 10000 }),
                        getAllPannes())
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 }), getPannesFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _deletePanne = createEffect(() =>
        this.action$.pipe(
            ofType(deletePanne),
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
                        getAllPannesByStateAndOther({statut, numero}),
                        getAllPannes())
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

}
