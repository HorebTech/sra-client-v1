import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GlobalChambreModel } from "../../models/Chambre.model";
import { ChambreChoisieModel } from "../../models/ChambreChoisieModel.model";

const chambreState = createFeatureSelector<GlobalChambreModel>('chambre');
const chambreChoisieState = createFeatureSelector<ChambreChoisieModel>('chambreChoisie');

export const findChambreOne = createSelector(chambreState, (state) => {
    return state.chambre;
});
export const findGlobalChambres = createSelector(chambreState, (state) => {
    return state.result;
});
export const findGlobalChambresByState = createSelector(chambreState, (state) => {
    return state.chambresByState;
});
export const findGlobalChambresPropres = createSelector(chambreState, (state) => {
    return state.chambresPropres;
});
export const findGlobalChambresEnNettoyage = createSelector(chambreState, (state) => {
    return state.chambresEnCoursDeNettoyage;
});
export const findOneChambreChoisie = createSelector(chambreChoisieState, (state) => {
    return state.chambreChoisie;
});
export const findGlobalChambresChoisie = createSelector(chambreChoisieState, (state) => {
    return state.result;
});
