import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { CategorieController } from "../../services/categorie/Categorie.controller.service";
import { createCategorie, deleteCategorie, deleteCategorieSuccess, getCategorieOne, getCategorieOneSuccess, getCategories, getCategoriesFail, getCategoriesSuccess, updateCategorie, updateCategorieSuccess } from "./Categorie.action";
import { showToast } from "../Common/App.action";

@Injectable()
export class CategorieEffects {

    service = inject(CategorieController);
    action$ = inject(Actions);

    _createCategorie = createEffect(() =>
        this.action$.pipe(
            ofType(createCategorie),
            switchMap((action) => {
                return this.service.Create(action.credential).pipe(
                    switchMap((data) => {
                        return of(getCategories(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Nouvelle catégorie ajoutée!", life: 10000 }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _getCategorieOne = createEffect(() =>
        this.action$.pipe(
            ofType(getCategorieOne),
            switchMap((action) => {
                return this.service.Get(action.id).pipe(
                    switchMap((data) => {
                        return of(getCategorieOneSuccess({ result: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.error.message, life: 5000 })))
                )
            })
        )
    )

    _getCategories = createEffect(() =>
        this.action$.pipe(
            ofType(getCategories),
            switchMap((action) => {
                return this.service.Gets().pipe(
                    switchMap((data) => {
                        return of(getCategoriesSuccess({ result: data }))
                    }),
                    catchError((_error) => of(showToast({ severity: 'error', summary: 'Oups !', detail: _error.message, life: 10000 })))
                )
            })
        )
    );

    _updateCategorie = createEffect(() =>
        this.action$.pipe(
            ofType(updateCategorie),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateCategorieSuccess({ inputdata: action.inputdata }),
                        getCategories(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Mise à jour réussie!", life: 5000 }))
                    }),
                    catchError((_error) => of(getCategoriesFail({errormessage: _error.error.message})))
                )
            })
        )
    )

    _deleteCategorie = createEffect(() =>
        this.action$.pipe(
            ofType(deleteCategorie),
            switchMap((action) => {
                return this.service.Delete(action.id).pipe(
                    switchMap((data) => {
                        return of(deleteCategorieSuccess({ id: action.id }),
                        getCategories(),
                        showToast({ severity: 'success', summary: 'Succès !', detail: "Suppression réussie!", life: 5000 }))
                    }),
                    catchError((_error) => of(getCategoriesFail({errormessage: _error.error.message})))
                )
            })
        )
    )

}