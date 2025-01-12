import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PannesModel } from "../../models/Panne.model";

const panneState = createFeatureSelector<PannesModel>('panne');

export const getPannesByStateOther = createSelector(panneState, (state) => {
    return state.pannesByStateAndOther;
});
export const findCountedByMarque = createSelector(panneState, (state) => {
    return state.countByMarque;
});
export const getPanne = createSelector(panneState, (state) => {
    return state.panne;
});
export const getGlobalPannes = createSelector(panneState, (state) => {
    return state.globalPannes;
});
export const getGlobalPannesByDay = createSelector(panneState, (state) => {
    return state.pannesByDay;
});
export const getGlobalPannesByDates = createSelector(panneState, (state) => {
    return state.pannesByDates;
});
export const getGlobalPannesInRoom = createSelector(panneState, (state) => {
    return state.globalPanneInRoom;
});
export const findTopChambre = createSelector(panneState, (state) => {
    return state.globalPanneInRoom;
});