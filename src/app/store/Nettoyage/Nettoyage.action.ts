import { createAction, props } from "@ngrx/store";
import { NettoyageCredentials, NettoyageInterface } from "../../models/Nettoyage.model";
import { CredentialNettoyageChoisit, NettoyageChoisieInterface } from "../../models/NettoyageChoisieModel.model";

export const CREER_NETTOYAGE='[composant nettoyage] création de nettoyage!';
export const CREER_NETTOYAGE_CHOISIE='[composant nettoyage choisie] création de nettoyage!';

export const RECUPERER_NETTOYAGE="[composant nettoyage] récupération d'un nettoyage!";
export const RECUPERER_NETTOYAGE_SUCCESS="[composant nettoyage] récupération d'un nettoyage success!";

export const RECUPERER_NETTOYAGE_CHOISIE="[composant nettoyage choisie] récupération d'un  choisie!";
export const RECUPERER_NETTOYAGE_CHOISIE_SUCCESS="[composant nettoyage choisie] récupération d'un nettoyage choisie success!";

export const CHARGER_NETTOYAGES="[composant nettoyage] chargement des nettoyage!";
export const CHARGER_NETTOYAGES_SUCCESS="[composant nettoyage] chargement des nettoyage réussie!";
export const CHARGER_NETTOYAGES_ECHEC="[composant nettoyage] chargement des nettoyage échouée!";

export const CHARGER_NETTOYAGES_CHOISIES="[composant nettoyage choisie] chargement des nettoyage!";
export const CHARGER_NETTOYAGES_CHOISIES_SUCCESS="[composant nettoyage choisie] chargement des nettoyage réussie!";
export const CHARGER_NETTOYAGES_CHOISIES_ECHEC="[composant nettoyage choisie] chargement des nettoyage échouée!";

export const UPDATE_NETTOYAGE="[composant nettoyage] Mise à jour d'un nettoyage!"
export const UPDATE_NETTOYAGE_SUCCESS="[composant nettoyage] Mise à jour d'un nettoyage réussie!"

export const DELETE_NETTOYAGE="[composant nettoyage] Suppression d'un nettoyage!"
export const DELETE_NETTOYAGE_SUCCESS="[composant nettoyage] Suppression d'un nettoyage réussie!"

export const DELETE_NETTOYAGE_CHOISIE="[composant nettoyage choisie] Suppression d'un nettoyage!"
export const DELETE_NETTOYAGE_CHOISIE_SUCCESS="[composant nettoyage choisie] Suppression d'un nettoyage réussie!"

export const saveNettoyage = createAction(CREER_NETTOYAGE, props<{credential: NettoyageCredentials}>());
export const saveNettoyageChoisie = createAction(CREER_NETTOYAGE_CHOISIE, props<{credential: CredentialNettoyageChoisit}>());

export const getNettoyage = createAction(RECUPERER_NETTOYAGE, props<{id: string}>());
export const getNettoyageSuccess=createAction(RECUPERER_NETTOYAGE_SUCCESS,props<{nettoyage:NettoyageInterface}>());
export const getNettoyageChoisie = createAction(RECUPERER_NETTOYAGE_CHOISIE, props<{id: string}>());
export const getNettoyageChoisieSuccess=createAction(RECUPERER_NETTOYAGE_CHOISIE_SUCCESS,props<{nettoyageChoisie:NettoyageChoisieInterface}>());

export const getAllNettoyages = createAction(CHARGER_NETTOYAGES);
export const getAllNettoyagesSuccess = createAction(CHARGER_NETTOYAGES_SUCCESS, props<{result: NettoyageInterface[]}>());
export const getAllNettoyagesFail = createAction(CHARGER_NETTOYAGES_ECHEC, props<{errormessage:string}>());

export const getAllNettoyagesChoisies = createAction(CHARGER_NETTOYAGES_CHOISIES);
export const getAllNettoyagesChoisiesSuccess = createAction(CHARGER_NETTOYAGES_CHOISIES_SUCCESS, props<{result: NettoyageChoisieInterface[]}>());
export const getAllNettoyagesChoisiesFail = createAction(CHARGER_NETTOYAGES_CHOISIES_ECHEC, props<{errormessage:string}>());

export const updateNettoyage=createAction(UPDATE_NETTOYAGE,props<{inputdata:NettoyageCredentials}>())
export const updateNettoyageSuccess=createAction(UPDATE_NETTOYAGE_SUCCESS,props<{nettoyage: NettoyageInterface}>())

export const deleteNettoyage=createAction(DELETE_NETTOYAGE,props<{id:string}>())
export const deleteNettoyageSuccess=createAction(DELETE_NETTOYAGE_SUCCESS,props<{id:string}>())
export const deleteNettoyageChoisie=createAction(DELETE_NETTOYAGE_CHOISIE,props<{id:string}>())
export const deleteNettoyageChoisieSuccess=createAction(DELETE_NETTOYAGE_CHOISIE_SUCCESS,props<{id:string}>())