import { CategorieInterface } from "./Categorie.model";

export interface NettoyageInterface {
    action?: string,
    categorie?: CategorieInterface,
    id?: string,
}

export interface NettoyageCredentials {
    action?: string,
    categorie?: string,
    id?: string,
}

export interface NettoyageModel{
    result:NettoyageInterface[],
    errormessage:string,
    nettoyage: NettoyageInterface
}