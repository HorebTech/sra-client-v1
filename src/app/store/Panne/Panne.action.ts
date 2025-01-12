import { createAction, props } from "@ngrx/store";
import { PanneCountMarque, PanneCredentials, PanneInterface } from "../../models/Panne.model";

export const GET_PANNE="[panne page] Récupérer une Panne!";
export const SAVE_PANNE="[panne page] Enrégistrer une nouvelle Panne!";
export const UPDATE_PANNE="[panne page] Modifier une nouvelle Panne!";
export const UPDATE_PANNE_STATE="[panne page] Modifier l'état d'une panne!";
export const DELETE_PANNE="[panne page] Supprimer ue nouvelle Panne!";
export const GET_ALL_PANNES="[panne page] Récupérer toutes les pannes!";
export const GET_ALL_PANNES_BY_STATE_AND_OTHER="[panne page] Récupérer toutes les pannes en focntion d'un état dans une chambre!";

export const GET_ALL_PANNES_BY_STATE_AND_OTHER_SUCCESS="[panne page] Récupérer toutes les pannes en focntion d'un état dans une chambre réussit!";

export const COUNTER_BY_MARQUE="[panne page] Compter toutes les pannes par marque!";
export const COUNTER_BY_MARQUE_SUCCESS="[panne page] Compter toutes les pannes par marque réussit!";

export const GET_ALL_PANNES_BY_STATE_AND_HALL="[panne page] Récupérer toutes les pannes en focntion d'un état dans une salle!";
export const GET_ALL_PANNES_BY_STATE_AND_HALL_SUCCESS="[panne page] Récupérer toutes les pannes en focntion d'un état dans une salle réussit!";

export const GET_ALL_PANNES_BY_DAY="[panne page] Récupérer toutes les pannes du jour!";
export const GET_ALL_PANNES_BY_DAY_SUCCESS="[panne page] Récupérer toutes les pannes du jour réussit!";

export const GET_ALL_PANNES_BY_DATES="[panne page] Récupérer toutes les pannes entre deux dates!";
export const GET_ALL_PANNES_BY_DATES_SUCCESS="[panne page] Récupérer toutes les pannes entre deux dates réussit!";

export const GET_PANNES_IN_ROOM="[panne page] Récupérer toutes les pannes avec filtre!";
export const GET_PANNES_IN_ROOM_SUCCESS="[panne page] Récupérer toutes les pannes avec filtre!";

export const GET_PANNE_SUCCESS="[panne page] Récupération d'une panne réussit!";
export const GET_PANNES_SUCCESS="[panne page] Récupération de toutes les pannes réussit!";
export const GET_PANNES_FAIL="[panne page] Récupération de toutes les pannes échouée!";

export const getPanne=createAction(GET_PANNE, props<{id:string}>())
export const savePanne = createAction(SAVE_PANNE, props<{credentials:PanneCredentials}>())

export const updatePanne = createAction(UPDATE_PANNE, props<{credentials: PanneCredentials}>())
export const updatePanneState = createAction(UPDATE_PANNE_STATE, props<{id: string, statut: string}>())

export const deletePanne=createAction(DELETE_PANNE,props<{id:string}>())
export const getAllPannes = createAction(GET_ALL_PANNES);

export const getAllPannesByStateAndOther = createAction(GET_ALL_PANNES_BY_STATE_AND_OTHER, props<{statut: string, numero: string}>());
export const getAllPannesByStateAndOtherSuccess = createAction(GET_ALL_PANNES_BY_STATE_AND_OTHER_SUCCESS, props<{pannesByStateAndOther: PanneInterface[]}>());

export const getAllPannesByDay = createAction(GET_ALL_PANNES_BY_DAY, props<{date: string}>());
export const getAllPannesByDaySuccess = createAction(GET_ALL_PANNES_BY_DAY_SUCCESS, props<{result: PanneInterface[]}>());

export const getAllPannesByDates = createAction(GET_ALL_PANNES_BY_DATES, props<{dateDebut: string, dateFin: string}>());
export const getAllPannesByDatesSuccess = createAction(GET_ALL_PANNES_BY_DATES_SUCCESS, props<{result: PanneInterface[]}>());

export const getPannesInRoom = createAction(GET_PANNES_IN_ROOM, props<{dateDebut: string, dateFin: string}>());
export const getPannesInRoomSuccess = createAction(GET_PANNES_IN_ROOM_SUCCESS, props<{result: any[]}>());

export const counterByMarque = createAction(COUNTER_BY_MARQUE);
export const counterByMarqueSuccess = createAction(COUNTER_BY_MARQUE_SUCCESS, props<{result: PanneCountMarque[]}>());

export const getPanneSuccess = createAction(GET_PANNE_SUCCESS, props<{panne: PanneInterface}>());
export const getPannesSuccess = createAction(GET_PANNES_SUCCESS, props<{globalPannes: PanneInterface[]}>());
export const getPannesFail = createAction(GET_PANNES_FAIL, props<{errormessage: string}>());
