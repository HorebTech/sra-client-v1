import { SalleInterface } from "./Salle.model";

export interface SalleChoisieCredentials {
    passeId?: number,
    numero?: string,
    statut?: string,
}

export interface SalleChoisieInterface {
    id?: string,
    salle?: SalleInterface,
    duree?: string,
    heureDebut?: string,
    heureFin?: string,
    panne?: [],
    objet?: []
}

export interface SalleChoisieModel{
    result:SalleChoisieInterface[],
    errormessage:string,
    salleChoisie: SalleChoisieInterface
}