import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StatutModel } from "../../models/Statut.model";

const statutState = createFeatureSelector<StatutModel>('statut');

export const findStatuts = createSelector(statutState, (state) => {
    return state.result;
});
export const findStatutOne = createSelector(statutState, (state) => {
    return state.statut;
})