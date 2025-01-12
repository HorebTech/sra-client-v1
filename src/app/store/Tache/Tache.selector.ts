import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TacheModel } from "../../models/Tache.model";
import { TacheChoisieModel } from "../../models/TacheChoisieModel.model";

const tacheState = createFeatureSelector<TacheModel>('tache');
const tacheChoisieState = createFeatureSelector<TacheChoisieModel>('tacheChoisie');

export const findTaches= createSelector(tacheState, (state) => {
    return state.result;
});
export const findTacheOne = createSelector(tacheState, (state) => {
    return state.tache;
});
export const findOneTacheChoisie = createSelector(tacheChoisieState, (state) => {
    return state.tacheChoisie;
});
export const findGlobalTachesChoisie = createSelector(tacheChoisieState, (state) => {
    return state.result;
});