import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ObjetsModel } from "../../models/Objet.model";

const objetState = createFeatureSelector<ObjetsModel>('objet');

export const getObjetsByStateOther = createSelector(objetState, (state) => {
    return state.objetsByStateOther;
});
export const getObjet = createSelector(objetState, (state) => {
    return state.objet;
});
export const getGlobalObjets = createSelector(objetState, (state) => {
    return state.globalObjets;
});