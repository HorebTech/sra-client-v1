import { createAction, props } from "@ngrx/store";
import { MarqueInterface } from "../../models/Marque.model";

export const CREER_MARQUE='[composant marque] création de marque!';

export const RECUPERER_MARQUE="[composant marque] récupération d'une marque!";
export const RECUPERER_MARQUE_SUCCESS="[composant marque] récupération d'une marque success!";

export const TOUTES_LES_MARQUES="[composant marque] chargement des marque!";
export const TOUTES_LES_MARQUES_SUCCESS="[composant marque] chargement des marque réussit!";
export const TOUTES_LES_MARQUES_ECHEC="[composant marque] chargement des marque échoué!";

export const UPDATE_MARQUE="[composant marque] Mise à jour d'une marque!"
export const UPDATE_MARQUE_SUCCESS="[composant marque] Mise à jour d'une marque réussit!"

export const DELETE_MARQUE="[composant marque] Suppression d'une marque!"
export const DELETE_MARQUE_SUCCESS="[composant marque] Suppression d'une marque réussit!"

export const createMarque = createAction(CREER_MARQUE, props<{credential: MarqueInterface}>());

export const getMarqueOne = createAction(RECUPERER_MARQUE, props<{id: string}>());
export const getMarqueOneSuccess=createAction(RECUPERER_MARQUE_SUCCESS,props<{result:MarqueInterface}>())

export const getMarques = createAction(TOUTES_LES_MARQUES);
export const getMarquesSuccess = createAction(TOUTES_LES_MARQUES_SUCCESS, props<{result: MarqueInterface[]}>());
export const getMarquesFail = createAction(TOUTES_LES_MARQUES_ECHEC, props<{errormessage:string}>());

export const updateMarque=createAction(UPDATE_MARQUE,props<{inputdata:MarqueInterface}>())
export const updateMarqueSuccess=createAction(UPDATE_MARQUE_SUCCESS,props<{inputdata:MarqueInterface}>())

export const deleteMarque=createAction(DELETE_MARQUE,props<{id:string}>())
export const deleteMarqueSuccess=createAction(DELETE_MARQUE_SUCCESS,props<{id:string}>())