import { createAction, props } from "@ngrx/store";
import { CategorieInterface } from "../../models/Categorie.model";

export const CREER_CATEGORIE='[composant catégorie] création de catégorie!';

export const RECUPERER_CATEGORIE="[composant catégorie] récupération d'une catégorie!";
export const RECUPERER_CATEGORIE_SUCCESS="[composant catégorie] récupération d'une catégorie success!";

export const TOUTES_LES_CATEGORIES="[composant catégorie] chargement des catégorie!";
export const TOUTES_LES_CATEGORIES_SUCCESS="[composant catégorie] chargement des catégorie réussit!";
export const TOUTES_LES_CATEGORIES_ECHEC="[composant catégorie] chargement des catégorie échoué!";

export const UPDATE_CATEGORIE="[composant catégorie] Mise à jour d'une catégorie!"
export const UPDATE_CATEGORIE_SUCCESS="[composant catégorie] Mise à jour d'une catégorie réussit!"

export const DELETE_CATEGORIE="[composant catégorie] Suppression d'une catégorie!"
export const DELETE_CATEGORIE_SUCCESS="[composant catégorie] Suppression d'une catégorie réussit!"

export const createCategorie = createAction(CREER_CATEGORIE, props<{credential: CategorieInterface}>());

export const getCategorieOne = createAction(RECUPERER_CATEGORIE, props<{id: string}>());
export const getCategorieOneSuccess=createAction(RECUPERER_CATEGORIE_SUCCESS,props<{result:CategorieInterface}>())

export const getCategories = createAction(TOUTES_LES_CATEGORIES);
export const getCategoriesSuccess = createAction(TOUTES_LES_CATEGORIES_SUCCESS, props<{result: CategorieInterface[]}>());
export const getCategoriesFail = createAction(TOUTES_LES_CATEGORIES_ECHEC, props<{errormessage:string}>());

export const updateCategorie=createAction(UPDATE_CATEGORIE,props<{inputdata:CategorieInterface}>())
export const updateCategorieSuccess=createAction(UPDATE_CATEGORIE_SUCCESS,props<{inputdata:CategorieInterface}>())

export const deleteCategorie=createAction(DELETE_CATEGORIE,props<{id:string}>())
export const deleteCategorieSuccess=createAction(DELETE_CATEGORIE_SUCCESS,props<{id:string}>())