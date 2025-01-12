import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PasseModel } from "../../models/Passe.model";

const passeState = createFeatureSelector<PasseModel>('passe');

export const getGlobalPasses = createSelector(passeState, (state) => {
    return state.globalPasses;
});
export const getUserPassesDay = createSelector(passeState, (state) => {
    return state.userPassesDay;
});
export const getUserPasses = createSelector(passeState, (state) => {
    return state.userPasses;
});
export const getPasseOne = createSelector(passeState, (state) => {
    return state.passe;
});
export const getNewPassesActif = createSelector(passeState, (state) => {
    return state.newsPassesActifs;
});
export const getNewPasses = createSelector(passeState, (state) => {
    return state.newsPasses;
});
export const getCurrentPasses = createSelector(passeState, (state) => {
    return state.currentPasses;
});