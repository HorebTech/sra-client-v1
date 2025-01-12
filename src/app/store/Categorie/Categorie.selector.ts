import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategorieModel } from "../../models/Categorie.model";

const categorieState = createFeatureSelector<CategorieModel>('categorie');

export const findCategories= createSelector(categorieState, (state) => {
    return state.result;
});
export const findCategorieOne = createSelector(categorieState, (state) => {
    return state.categorie;
})