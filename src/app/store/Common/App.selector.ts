import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateModel } from "../../models/AppState.model";

const getAppState = createFeatureSelector<AppStateModel>('app')

export const getUserConnected = createSelector(getAppState, (state) => {
    return state.authResponse
});
