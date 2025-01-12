import { createAction, props } from "@ngrx/store";
import { TacheCredentials, TacheInterface } from "../../models/Tache.model";
import { CredentialTacheChoisie, TacheChoisieInterface } from "../../models/TacheChoisieModel.model";

export const CREER_TACHE='[composant tache] création de tache!';
export const CREER_TACHE_CHOISIE='[composant tache choisie] création de tache!';

export const RECUPERER_TACHE="[composant tache] récupération d'un travail!";
export const RECUPERER_TACHE_SUCCESS="[composant tache] récupération d'un travail success!";

export const RECUPERER_TACHE_CHOISIE="[composant tache choisie] récupération d'un  choisie!";
export const RECUPERER_TACHE_CHOISIE_SUCCESS="[composant tache choisie] récupération d'un travail choisie success!";

export const CHARGER_TACHES="[composant tache] chargement des tache!";
export const CHARGER_TACHES_SUCCESS="[composant tache] chargement des tache réussie!";
export const CHARGER_TACHES_ECHEC="[composant tache] chargement des tache échouée!";

export const CHARGER_TACHES_CHOISIES="[composant tache choisie] chargement des tache!";
export const CHARGER_TACHES_CHOISIES_SUCCESS="[composant tache choisie] chargement des tache réussie!";
export const CHARGER_TACHES_CHOISIES_ECHEC="[composant tache choisie] chargement des tache échouée!";

export const UPDATE_TACHE="[composant tache] Mise à jour d'une tâche!"
export const UPDATE_TACHE_SUCCESS="[composant tache] Mise à jour d'une tâche réussie!"

export const DELETE_TACHE="[composant tache] Suppression d'une tâche!"
export const DELETE_TACHE_SUCCESS="[composant tache] Suppression d'une tâche réussie!"

export const DELETE_TACHE_CHOISIE="[composant tache choisie] Suppression d'une tâche!"
export const DELETE_TACHE_CHOISIE_SUCCESS="[composant tache choisie] Suppression d'une tâche réussie!"

export const saveTache = createAction(CREER_TACHE, props<{credential: TacheCredentials}>());
export const saveTacheChoisie = createAction(CREER_TACHE_CHOISIE, props<{credential: CredentialTacheChoisie}>());

export const getTache = createAction(RECUPERER_TACHE, props<{id: string}>());
export const getTacheSuccess=createAction(RECUPERER_TACHE_SUCCESS,props<{tache:TacheInterface}>());
export const getTacheChoisie = createAction(RECUPERER_TACHE_CHOISIE, props<{id: string}>());
export const getTacheChoisieSuccess=createAction(RECUPERER_TACHE_CHOISIE_SUCCESS,props<{tacheChoisie:TacheChoisieInterface}>());

export const getAllTaches = createAction(CHARGER_TACHES);
export const getAllTachesSuccess = createAction(CHARGER_TACHES_SUCCESS, props<{result: TacheInterface[]}>());
export const getAllTachesFail = createAction(CHARGER_TACHES_ECHEC, props<{errormessage:string}>());

export const getAllTachesChoisies = createAction(CHARGER_TACHES_CHOISIES);
export const getAllTachesChoisiesSuccess = createAction(CHARGER_TACHES_CHOISIES_SUCCESS, props<{result: TacheChoisieInterface[]}>());
export const getAllTachesChoisiesFail = createAction(CHARGER_TACHES_CHOISIES_ECHEC, props<{errormessage:string}>());

export const updateTache=createAction(UPDATE_TACHE,props<{inputdata:TacheCredentials}>())
export const updateTacheSuccess=createAction(UPDATE_TACHE_SUCCESS,props<{tache: TacheInterface}>())

export const deleteTache=createAction(DELETE_TACHE,props<{id:string}>())
export const deleteTacheSuccess=createAction(DELETE_TACHE_SUCCESS,props<{id:string}>())
export const deleteTacheChoisie=createAction(DELETE_TACHE_CHOISIE,props<{id:string}>())
export const deleteTacheChoisieSuccess=createAction(DELETE_TACHE_CHOISIE_SUCCESS,props<{id:string}>())