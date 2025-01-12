import { createAction, props } from "@ngrx/store";
import { ChambreChoisieCredentials, ChambreChoisieInterface } from "../../models/ChambreChoisieModel.model";
import { ChambreModel } from "../../models/Chambre.model";

export const GET_CHAMBRE="[chambre page] Récupérer une chambre!";
export const GET_CHAMBRE_CHOISIE="[chambre choisie page] Récupérer une chambre choisie!";
export const GET_CHAMBRE_CHOISIE_SUCCESS="[chambre choisie page] Récupération d'une chambre choisie réussie!";

export const SAVE_CHAMBRE="[chambre page] Enrégistrer une nouvelle chambre!";
export const SAVE_CHAMBRE_CHOISIE="[chambre choisie page] Enrégistrer une nouvelle chambre choisie!";

export const UPDATE_CHAMBRE="[chambre page] Modifier une chambre!";
export const UPDATE_CHAMBRE_SUCCESS="[chambre page] Modification d'une chambre réussit!";

export const UPDATE_CHAMBRE_STATE="[chambre page] Modifier l'état d'une chambre!";
export const UPDATE_CHAMBRE_STATE_SUCCESS="[chambre page] Modification de l'état d'une chambre réussit!";

export const UPDATE_CHAMBRE_CHOISIE="[chambre choisie page] Modifier une chambre choisie!";
export const UPDATE_CHAMBRE_CHOISIE_SUCCESS="[chambre choisie page] Modification d'une chambre choisie réussit!";

export const DELETE_CHAMBRE="[chambre page] Supprimer une chambre!";
export const DELETE_CHAMBRE_CHOISIE="[chambre choisie page] Supprimer une chambre choisie!";

export const GET_ALL_CHAMBRES="[chambre page] Récupérer toutes les chambres!";
export const GET_ALL_CHAMBRES_BY_STATE="[chambre page] Récupérer toutes les chambres par état!";
export const GET_ALL_CHAMBRES_CHOISIE="[chambre choisie page] Récupérer toutes les chambres choisie!";

export const GET_ALL_CHAMBRES_PROPRES="[chambre page] Récupérer toutes les chambres propres!";
export const GET_ALL_CHAMBRES_PROPRES_SUCCESS="[chambre page] Récupérer toutes les chambres propres succès!";

export const GET_ALL_CHAMBRES_EN_NETTOYAGES="[chambre page] Récupérer toutes les chambres en nettoyages!";
export const GET_ALL_CHAMBRES_EN_NETTOYAGES_SUCCESS="[chambre page] Récupérer toutes les chambres en nettoyages succès!";

export const GET_CHAMBRE_SUCCESS="[chambre page] Récupération d'une chambre réussit!";
export const GET_ALL_CHAMBRES_SUCCESS="[chambre page] Récupération de toutes les chambres réussit!";
export const GET_ALL_CHAMBRES_CHOISIE_SUCCESS="[chambre choisie page] Récupération de toutes les chambres choisies réussit!";
export const GET_ALL_CHAMBRES_BY_STATE_SUCCESS="[chambre page] Récupération de toutes les chambres en fonction d'un état réussit!";
export const GET_CHAMBRES_FAIL="[chambre page] Récupération de toutes les chambres échouée!";

export const getChambre=createAction(GET_CHAMBRE, props<{id:string}>())
export const getChambreChoisie=createAction(GET_CHAMBRE_CHOISIE, props<{id:string}>())
export const getChambreChoisieSuccess = createAction(GET_CHAMBRE_CHOISIE_SUCCESS, props<{chambreChoisie: ChambreChoisieInterface}>());

export const saveChambre = createAction(SAVE_CHAMBRE, props<{credentials:ChambreModel}>())
export const saveChambreChoisie = createAction(SAVE_CHAMBRE_CHOISIE, props<{credentials: ChambreChoisieCredentials}>())

export const updateChambre = createAction(UPDATE_CHAMBRE, props<{credentials: ChambreModel}>())
export const updateChambreSuccess = createAction(UPDATE_CHAMBRE_SUCCESS, props<{chambre: ChambreModel}>());
export const updateChambreState = createAction(UPDATE_CHAMBRE_STATE, props<{id:string, etat: string}>())
export const updateChambreStateSuccess = createAction(UPDATE_CHAMBRE_SUCCESS, props<{chambre: ChambreModel}>());
export const updateChambreChoisie = createAction(UPDATE_CHAMBRE_CHOISIE, props<{id:string, credentials: ChambreChoisieCredentials}>())
export const updateChambreChoisieSuccess = createAction(UPDATE_CHAMBRE_CHOISIE_SUCCESS, props<{chambreChoisie: ChambreChoisieInterface}>());

export const deleteChambre=createAction(DELETE_CHAMBRE, props<{id:string}>())
export const deleteChambreChoisie=createAction(DELETE_CHAMBRE_CHOISIE, props<{id:string}>())

export const getAllChambres = createAction(GET_ALL_CHAMBRES);
export const getChambreSuccess = createAction(GET_CHAMBRE_SUCCESS, props<{chambre: ChambreModel}>());
export const getAllChambresSuccess = createAction(GET_ALL_CHAMBRES_SUCCESS, props<{result: ChambreModel[]}>());
export const getAllChambresChoisie = createAction(GET_ALL_CHAMBRES_CHOISIE);
export const getAllChambresChoisieSuccess = createAction(GET_ALL_CHAMBRES_CHOISIE_SUCCESS, props<{result: ChambreChoisieInterface[]}>());

export const getAllChambresByState = createAction(GET_ALL_CHAMBRES_BY_STATE, props<{etat: string}>());
export const getAllChambresByStateSuccess = createAction(GET_ALL_CHAMBRES_BY_STATE_SUCCESS, props<{result: ChambreModel[]}>());

export const getAllChambresPropres = createAction(GET_ALL_CHAMBRES_PROPRES, props<{etat: string}>());
export const getAllChambresPropresSuccess = createAction(GET_ALL_CHAMBRES_PROPRES_SUCCESS, props<{result: ChambreModel[]}>());

export const getAllChambresEnNettoyages = createAction(GET_ALL_CHAMBRES_EN_NETTOYAGES, props<{etat: string}>());
export const getAllChambresEnNettoyagesSuccess = createAction(GET_ALL_CHAMBRES_EN_NETTOYAGES_SUCCESS, props<{result: ChambreModel[]}>());

export const getChambresFail = createAction(GET_CHAMBRES_FAIL, props<{errormessage: string}>());
