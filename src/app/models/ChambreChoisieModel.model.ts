import { ChambreModel } from "./Chambre.model";

export interface ChambreChoisieCredentials {
    passeId?: number,
    numero?: string,
    statut?: string,
}

export interface ChambreChoisieInterface {
    id?: string,
    chambre?: ChambreModel,
    duree?: string,
    heureDebut?: string,
    heureFin?: string,
    panne?: [],
    objet?: []
}

export interface ChambreChoisieModel{
    result:ChambreChoisieInterface[],
    errormessage:string,
    chambreChoisie: ChambreChoisieInterface
}