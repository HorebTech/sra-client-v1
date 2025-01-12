import { createAction, props } from "@ngrx/store";
import { SalleChoisieCredentials, SalleChoisieInterface } from "../../models/SalleChoisieModel.model";
import { SalleInterface, SalleModel } from "../../models/Salle.model";

export const GET_SALLE="[salle page] Récupérer une salle!";
export const GET_SALLE_CHOISIE="[salle choisie page] Récupérer une salle choisie!";
export const GET_SALLE_CHOISIE_SUCCESS="[salle choisie page] Récupération d'une salle choisie réussit!";

export const SAVE_SALLE="[salle page] Enrégistrer une nouvelle salle!";
export const SAVE_SALLE_CHOISIE="[salle choisie page] Enrégistrer une nouvelle salle choisie!";

export const UPDATE_SALLE="[salle page] Modifier une salle!";
export const UPDATE_SALLE_STATE="[salle page] Modifier l'état d'une salle!";
export const UPDATE_SALLE_STATE_SUCCESS="[salle page] Modification de l'état d'une salle réussit!";
export const UPDATE_SALLE_SUCCESS="[salle page] Modification d'une salle réussit!";
export const UPDATE_SALLE_CHOISIE="[salle choisie page] Modifier une salle choisie!";
export const UPDATE_SALLE_CHOISIE_SUCCESS="[salle choisie page] Modification d'une salle choisie réussit!";

export const DELETE_SALLE="[salle page] Supprimer une salle!";
export const DELETE_SALLE_CHOISIE="[salle choisie page] Supprimer une salle choisie!";

export const GET_ALL_SALLES="[salle page] Récupérer toutes les salles!";
export const GET_ALL_SALLES_BY_STATE="[salle page] Récupérer toutes les salles par état!";
export const GET_ALL_SALLES_CHOISIE="[salle choisie page] Récupérer toutes les salles choisie!";

export const GET_ALL_SALLES_PROPRES="[salle page] Récupérer toutes les salles propres!";
export const GET_ALL_SALLES_PROPRES_SUCCESS="[salle page] Récupérer toutes les salles propres succès!";

export const GET_ALL_SALLES_EN_NETTOYAGES="[salle page] Récupérer toutes les salles en cours de nettoyage!";
export const GET_ALL_SALLES_EN_NETTOYAGES_SUCCESS="[salle page] Récupérer toutes les salles en cours de nettoyage succès!";

export const GET_SALLE_SUCCESS="[salle page] Récupération d'une salle réussit!";
export const GET_ALL_SALLES_SUCCESS="[salle page] Récupération de toutes les salles réussit!";
export const GET_ALL_SALLES_CHOISIE_SUCCESS="[salle choisie page] Récupération de toutes les salles choisies réussit!";
export const GET_ALL_SALLES_BY_STATE_SUCCESS="[salle page] Récupération de toutes les salles en fonction d'un état réussit!";
export const GET_SALLES_FAIL="[salle page] Récupération de toutes les salles échouée!";

export const getSalle=createAction(GET_SALLE, props<{id:string}>())
export const getSalleChoisie=createAction(GET_SALLE_CHOISIE, props<{id:string}>())
export const getSalleChoisieSuccess = createAction(GET_SALLE_CHOISIE_SUCCESS, props<{salleChoisie: SalleChoisieInterface}>());

export const saveSalle = createAction(SAVE_SALLE, props<{credentials:SalleInterface}>());
export const saveSalleChoisie = createAction(SAVE_SALLE_CHOISIE, props<{credentials: SalleChoisieCredentials}>());

export const updateSalle = createAction(UPDATE_SALLE, props<{credentials: SalleInterface}>());
export const updateSalleSuccess = createAction(UPDATE_SALLE_SUCCESS, props<{salle: SalleInterface}>());
export const updateSalleState = createAction(UPDATE_SALLE_STATE, props<{id:string, etat: string}>())
export const updateSalleStateSuccess = createAction(UPDATE_SALLE_SUCCESS, props<{salle: SalleInterface}>());
export const updateSalleChoisie = createAction(UPDATE_SALLE_CHOISIE, props<{id:string, credentials: SalleChoisieCredentials}>())
export const updateSalleChoisieSuccess = createAction(UPDATE_SALLE_CHOISIE_SUCCESS, props<{salleChoisie: SalleChoisieInterface}>());

export const deleteSalle=createAction(DELETE_SALLE, props<{id:string}>())
export const deleteSalleChoisie=createAction(DELETE_SALLE_CHOISIE, props<{id:string}>())

export const getAllSalles = createAction(GET_ALL_SALLES);
export const getSalleSuccess = createAction(GET_SALLE_SUCCESS, props<{salle: SalleInterface}>());
export const getAllSallesSuccess = createAction(GET_ALL_SALLES_SUCCESS, props<{result: SalleInterface[]}>());
export const getAllSallesChoisie = createAction(GET_ALL_SALLES_CHOISIE);
export const getAllSallesChoisieSuccess = createAction(GET_ALL_SALLES_CHOISIE_SUCCESS, props<{result: SalleChoisieInterface[]}>());

export const getAllSallesByState = createAction(GET_ALL_SALLES_BY_STATE, props<{etat: string}>());
export const getAllSallesByStateSuccess = createAction(GET_ALL_SALLES_BY_STATE_SUCCESS, props<{result: SalleInterface[]}>());

export const getAllSallesPropres = createAction(GET_ALL_SALLES_PROPRES, props<{etat: string}>());
export const getAllSallesPropresSuccess = createAction(GET_ALL_SALLES_PROPRES_SUCCESS, props<{result: SalleInterface[]}>());

export const getAllSallesEnNettoyage = createAction(GET_ALL_SALLES_EN_NETTOYAGES, props<{etat: string}>());
export const getAllSallesEnNettoyageSuccess = createAction(GET_ALL_SALLES_EN_NETTOYAGES_SUCCESS, props<{result: SalleInterface[]}>());

export const getSallesFail = createAction(GET_SALLES_FAIL, props<{errormessage: string}>());
