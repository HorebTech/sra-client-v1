import { CategorieInterface } from "./Categorie.model"

export interface TacheInterface {
    action?: string,
    categorie?: CategorieInterface,
    sous_categorie?: CategorieInterface,
    id?: string
}

export interface TacheCredentials {
    action?: string,
    categorie?: string,
    sous_categorie?: string,
    id?: string
}

export interface TacheModel{
    result:TacheInterface[],
    errormessage:string,
    tache: TacheInterface
}
