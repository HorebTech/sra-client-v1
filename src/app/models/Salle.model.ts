import { StatutInterface } from "./Statut.model"


export interface SalleInterface {
    id?: string,
    numero?: string,
    description?:string,
    statut?: StatutInterface
}

export interface SalleModel{
    result:SalleInterface[],
    sallesByState:SalleInterface[],
    sallesPropres:SalleInterface[],
    sallesEnCoursDeNettoyage:SalleInterface[],
    errormessage:string,
    salle: SalleInterface
}