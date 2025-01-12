import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SalleModel } from "../../models/Salle.model";
import { SalleChoisieModel } from "../../models/SalleChoisieModel.model";

const salleState = createFeatureSelector<SalleModel>('salle');
const salleChoisieState = createFeatureSelector<SalleChoisieModel>('salleChoisie');

export const findSalle = createSelector(salleState, (state) => {
    return state.salle;
});
export const findGlobalSalles = createSelector(salleState, (state) => {
    return state.result;
});
export const findGlobalSallesByState = createSelector(salleState, (state) => {
    return state.sallesByState;
});
export const findGlobalSallesPropres = createSelector(salleState, (state) => {
    return state.sallesPropres;
});
export const findGlobalSallesEnNettoyage = createSelector(salleState, (state) => {
    return state.sallesEnCoursDeNettoyage;
});

export const findOneSalleChoisie = createSelector(salleChoisieState, (state) => {
    return state.salleChoisie;
});
export const findGlobalSallesChoisie = createSelector(salleChoisieState, (state) => {
    return state.result;
});