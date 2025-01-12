import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MarqueModel } from "../../models/Marque.model";

const marqueState = createFeatureSelector<MarqueModel>('marque');

export const findMarques= createSelector(marqueState, (state) => {
    return state.result;
});
export const findMarqueOne = createSelector(marqueState, (state) => {
    return state.marque;
})