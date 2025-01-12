import { createAction, props } from "@ngrx/store";
import { AuthResponse, Utilisateur } from "../../models/User.model";

export const SHOW_TOAST = "[app] affichage du message d'alerte";
export const EMPTY_ACTION = '[app] empty';
export const USER_CONNECTED = '[app] utilisateur connecté';
export const USER_CONNECTED_SUCCESS = '[app] utilisateur connecté récupéré'

export const showToast = createAction(SHOW_TOAST, props<{severity: string, summary: string, detail: string, life: number}>());
export const emptyaction = createAction(EMPTY_ACTION);
export const userConnected = createAction(USER_CONNECTED, props<{nom: string}>());
export const userConnectedSuccess = createAction(USER_CONNECTED_SUCCESS, props<{userConnected: AuthResponse}>());