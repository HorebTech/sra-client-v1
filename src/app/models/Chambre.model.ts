import { CategorieInterface } from "./Categorie.model"
import { StatutInterface } from "./Statut.model"


export interface ChambreModel {
    id?: string,
    numero?: string,
    localisation?:string,
    categorie?:CategorieInterface,
    statut?: StatutInterface
}

export interface GlobalChambreModel{
    result:ChambreModel[],
    chambresByState:ChambreModel[],
    chambresPropres:ChambreModel[],
    chambresEnCoursDeNettoyage:ChambreModel[],
    errormessage:string,
    chambre: ChambreModel
}