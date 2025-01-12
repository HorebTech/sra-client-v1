import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NettoyageModel } from "../../models/Nettoyage.model";
import { NettoyageChoisieModel } from "../../models/NettoyageChoisieModel.model";

const nettoyageState = createFeatureSelector<NettoyageModel>('nettoyage');
const nettoyageChoisieState = createFeatureSelector<NettoyageChoisieModel>('nettoyageChoisie');

export const findNettoyages= createSelector(nettoyageState, (state) => {
    return state.result;
});
export const findNettoyageOne = createSelector(nettoyageState, (state) => {
    return state.nettoyage;
});
export const findOneNettoyageChoisie = createSelector(nettoyageChoisieState, (state) => {
    return state.nettoyageChoisie;
});
export const findGlobalNettoyagesChoisie = createSelector(nettoyageChoisieState, (state) => {
    return state.result;
});