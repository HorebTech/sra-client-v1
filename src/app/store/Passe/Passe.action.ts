import { createAction, props } from "@ngrx/store";
import { PasseInterface } from "../../models/Passe.model";

export const FIND_GLOBAL_PASSES='[dashboard passe] Chargement de tous les passes!';
export const FIND_GLOBAL_PASSES_SUCCESS='[dashboard passe] Chargement de tous les passes réussit!';

export const FIND_USER_PASSES="[dashboard agent] Chargement de tous les passes d'un utilisateur!";
export const FIND_USER_PASSES_SUCCESS="[dashboard agent] Chargement de tous les passes d'un utilisateur réussit!";
export const FIND_PASSES_FAIL='[passe] Chargement de tous les passes échoué!';

export const FIND_USER_PASSES_BY_DATE_BY_STATE="[dashboard agent] Chargement de tous les passes d'un agent par état et par date!";
export const FIND_USER_PASSES_BY_DATE_BY_STATE_SUCCESS="[dashboard agent] Chargement de tous les passes d'un agent par état et par date réussit!";

export const FIND_NEW_AND_CURRENT_PASSES="[dashboard agent] Chargement de tous les passes d'un agent par date!";
export const FIND_NEW_AND_CURRENT_PASSES_SUCCESS="[dashboard agent] Chargement de tous les passes d'un agent par date réussit!";

export const FIND_PASSE_ONE="[dashboard passe] Récupérer un passe!";
export const FIND_PASSE_ONE_SUCCESS="[dashboard passe] Récupération d'un passe réussit!";

export const RESET_PASSE="[dashboard passe] Réinitialisation du passe!";
export const DELETE_PASSE="[dashboard passe] Suppression de passe!";
export const UPDATE_PASSE_STATE="[dashboard passe] Mise à jour d'un passe!";

export const FIND_NEW_PASSES="[dashboard agent] Chargement de tous les nouveaux passes !";
export const FIND_NEW_PASSES_SUCCESS="[dashboard agent] Chargement de tous les nouveaux passes réussit!";

export const FIND_CURRENT_PASSES="[dashboard agent] Chargement de tous les passes en cours !";
export const FIND_CURRENT_PASSES_SUCCESS="[dashboard agent] Chargement de tous les passes en cours réussit!";

export const findUserPasses = createAction(FIND_USER_PASSES, props<{agent: string, nom: string}>());
export const findUserPassesSuccess = createAction(FIND_USER_PASSES_SUCCESS, props<{userPasses: PasseInterface[]}>());

export const findNewPasses = createAction(FIND_NEW_PASSES, props<{nom: string}>());
export const findNewPassesSuccess = createAction(FIND_NEW_PASSES_SUCCESS, props<{result: PasseInterface[]}>());

export const findCurrentPasses = createAction(FIND_CURRENT_PASSES, props<{nom: string}>());
export const findCurrentPassesSuccess = createAction(FIND_CURRENT_PASSES_SUCCESS, props<{result: PasseInterface[]}>());

export const findPassesByStateAndDate = createAction(FIND_USER_PASSES_BY_DATE_BY_STATE, props<{agent: string, nom: string, date: string}>());
export const findPassesByStateAndDateSuccess = createAction(FIND_USER_PASSES_BY_DATE_BY_STATE_SUCCESS, props<{userPassesDay: PasseInterface[]}>());

export const findNewAndCurrentPasses = createAction(FIND_NEW_AND_CURRENT_PASSES, props<{agent: string, date: string}>());
export const findNewAndCurrentPassesSuccess = createAction(FIND_NEW_AND_CURRENT_PASSES_SUCCESS, props<{newsPassesActifs: PasseInterface[]}>());

export const updatePasseState = createAction(UPDATE_PASSE_STATE, props<{passeId: number, nom: string}>());

export const findGlobalPasses = createAction(FIND_GLOBAL_PASSES);
export const findGlobalPassesSuccess = createAction(FIND_GLOBAL_PASSES_SUCCESS, props<{globalPasses: PasseInterface[]}>());
export const findGlobalPassesFail = createAction(FIND_PASSES_FAIL, props<{errormessage:string}>());

export const findPasseOne = createAction(FIND_PASSE_ONE, props<{id: number}>());
export const findPasseOneSuccess=createAction(FIND_PASSE_ONE_SUCCESS,props<{passe: PasseInterface}>())
export const resetPasse=createAction(RESET_PASSE);

export const deletePasse=createAction(DELETE_PASSE,props<{id:number}>())