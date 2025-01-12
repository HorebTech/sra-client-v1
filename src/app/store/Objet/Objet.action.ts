import { createAction, props } from "@ngrx/store";
import { Credentials, ObjetInterface } from "../../models/Objet.model";

export const GET_OBJET="[objet page] Récupérer un Objet!";
export const SAVE_OBJET="[objet page] Enrégistrer un nouvel Objet!";
export const UPDATE_OBJET="[objet page] Modifier un nouvel Objet!";
export const UPDATE_OBJET_STATE="[objet page] Modifier l'état d'un nouvel Objet!";
export const DELETE_OBJET="[objet page] Supprimer un nouvel Objet!";
export const DELETE_OBJET_SUCCESS="[objet page] Supprimer un nouvel Objet réussie!";
export const GET_ALL_OBJETS="[objet page] Récupérer tous les objets!";
export const GET_ALL_OBJETS_BY_STATE_AND_OTHER="[objet page] Récupérer tous les objets en focntion d'un état dans une chambre!";
export const GET_ALL_OBJETS_BY_STATE_AND_OTHER_SUCCESS="[objet page] Récupérer tous les objets en focntion d'un état dans une chambre réussit!";
export const GET_OBJET_SUCCESS="[objet page] Récupération d'un objet réussit!";
export const GET_OBJETS_SUCCESS="[objet page] Récupération de tous les objets réussit!";
export const GET_OBJETS_FAIL="[objet page] Récupération de tous les objets échouée!";

export const getObjet=createAction(GET_OBJET, props<{id:string}>())
export const saveObjet = createAction(SAVE_OBJET, props<{credentials:Credentials}>())
export const updateObjet = createAction(UPDATE_OBJET, props<{credentials: Credentials}>())
export const updateObjetState = createAction(UPDATE_OBJET_STATE, props<{id: string, statut: string}>())
export const deleteObjet=createAction(DELETE_OBJET,props<{id:string}>());
export const deleteObjetSuccess=createAction(DELETE_OBJET_SUCCESS,props<{id:string}>());
export const getAllObjets = createAction(GET_ALL_OBJETS);
export const getAllObjetsByStateAndOther = createAction(GET_ALL_OBJETS_BY_STATE_AND_OTHER, props<{statut: string, numero: string}>());
export const getAllObjetsByStateAndOtherSuccess = createAction(GET_ALL_OBJETS_BY_STATE_AND_OTHER_SUCCESS, props<{objetsByStateOther: ObjetInterface[]}>());
export const getObjetSuccess = createAction(GET_OBJET_SUCCESS, props<{objet: ObjetInterface}>());
export const getObjetsSuccess = createAction(GET_OBJETS_SUCCESS, props<{globalObjets: ObjetInterface[]}>());
export const getObjetsFail = createAction(GET_OBJETS_FAIL, props<{errormessage: string}>());
