// import { createAction, props } from "@ngrx/store";
import { createAction, props } from "@ngrx/store";
import { UserRoleAccess, Utilisateur } from "../../models/User.model";

export const GET_USER_BY_NAME="[auth] Vérification de l'existance de l'utilisateur ";
export const GET_USER_BY_NAME_SUCCESS="[auth] Vérification de l'existance de l'utilisateur réussit";

export const BEGIN_LOGIN = '[auth] Connexion';

export const RESET_PASSWORD='[app] réinitialiser le mot de passe';
export const RESET_PASSWORD_SUCCESS='[app] Mot de passe réinitialisé!';

export const FETCH_MENU='[user] récupération du menu';
export const FETCH_MENU_SUCCESS='[user] récupération du menu réussit.';

export const UPDATE_USER="[app] Mise à jour de l'utilisateur connecté";
export const UPDATE_USER_BY_ADMIN="[app] update utilisateur par l'administrateur";
export const UPDATE_USER_BY_ADMIN_SUCCESS="[app] update utilisateur par l'administrateur réussit";

export const UPDATE_USER_PHOTO='[app] update photo utilisateur connecté';
export const UPDATE_USER_SUCCESS='[app] update utilisateur connecté réussit';

export const GET_ALL_USERS='[app] recuperation des utilisateurs';
export const GET_ALL_USERS_SUCCESS='[app] recuperation des utilisateurs réussit';

export const DELETE_USER="[app] Suppression d'un utilisateur!";
export const DELETE_USER_SUCCESS="[app] Suppression d'un utilisateur réussit!";

export const BEGIN_REGISTER="[auth] Création d'un utilisateur";


export const getUserByName=createAction(GET_USER_BY_NAME,props<{nom:string}>());
export const getUserByNameSuccess=createAction(GET_USER_BY_NAME_SUCCESS,props<{isUserExisted:boolean}>());

export const beginLogin = createAction(BEGIN_LOGIN, props<{credential: Utilisateur}>());

export const passwordReset=createAction(RESET_PASSWORD,props<{credentials:Utilisateur}>())
export const passwordResetSuccess=createAction(RESET_PASSWORD_SUCCESS)

export const fetchmenu=createAction(FETCH_MENU,props<{userrole:string}>())
export const fetchmenusuccess=createAction(FETCH_MENU_SUCCESS,props<{menulist:UserRoleAccess[]}>());

export const beginRegister = createAction(BEGIN_REGISTER, props<{userdata: Utilisateur}>());

export const getUtilisateurs=createAction(GET_ALL_USERS)
export const getUtilisateursSuccess=createAction(GET_ALL_USERS_SUCCESS, props<{userlist:Utilisateur[]}>())

export const deleteUtilisateur=createAction(DELETE_USER,props<{id:string}>())
export const deleteUtilisateurSuccess=createAction(DELETE_USER_SUCCESS, props<{userlist:Utilisateur[]}>())

export const updateUtilisateur=createAction(UPDATE_USER,props<{credentials:Utilisateur}>())
export const updateUtilisateurByAdmin=createAction(UPDATE_USER_BY_ADMIN,props<{credentials:Utilisateur}>())
export const updateUtilisateurByAdminSuccess=createAction(UPDATE_USER_BY_ADMIN_SUCCESS,props<{credentials:Utilisateur}>())
export const updateUserPhoto=createAction(UPDATE_USER_PHOTO,props<{credentials:Utilisateur}>())
export const updateUtilisateurSuccess=createAction(UPDATE_USER_SUCCESS,props<{credentials:Utilisateur}>())

