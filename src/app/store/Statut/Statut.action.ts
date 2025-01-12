import { createAction, props } from "@ngrx/store";
import { StatutInterface } from "../../models/Statut.model";

export const CREER_STATUT='[page statut] création de statut!';

export const RECUPERER_STATUT="[page statut] récupération d'un statut!";
export const RECUPERER_STATUT_SUCCESS="[page statut] récupération d'une statut succès!";

export const TOUS_LES_STATUTS="[page statut] chargement des statuts!";
export const TOUS_LES_STATUTS_SUCCESS="[page statut] chargement des statut réussit!";
export const TOUS_LES_STATUTS_ECHEC="[page statut] chargement des statut échoué!";

export const UPDATE_STATUT="[page statut] Mise à jour d'une statut!"
export const UPDATE_STATUT_SUCCESS="[page statut] Mise à jour d'une statut réussit!"

export const DELETE_STATUT="[page statut] Suppression d'une statut!"
export const DELETE_STATUT_SUCCESS="[page statut] Suppression d'une statut réussit!"

export const createStatut = createAction(CREER_STATUT, props<{credential: StatutInterface}>());

export const getStatutOne = createAction(RECUPERER_STATUT, props<{id: string}>());
export const getStatutOneSuccess=createAction(RECUPERER_STATUT_SUCCESS,props<{result:StatutInterface}>())

export const getStatuts = createAction(TOUS_LES_STATUTS);
export const getStatutsSuccess = createAction(TOUS_LES_STATUTS_SUCCESS, props<{result: StatutInterface[]}>());
export const getStatutsFail = createAction(TOUS_LES_STATUTS_ECHEC, props<{errormessage:string}>());

export const updateStatut=createAction(UPDATE_STATUT,props<{inputdata:StatutInterface}>())
export const updateStatutSuccess=createAction(UPDATE_STATUT_SUCCESS,props<{inputdata:StatutInterface}>())

export const deleteStatut=createAction(DELETE_STATUT,props<{id:string}>())
export const deleteStatutSuccess=createAction(DELETE_STATUT_SUCCESS,props<{id:string}>())