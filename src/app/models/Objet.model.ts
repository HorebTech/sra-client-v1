import { ChambreChoisieInterface } from "./ChambreChoisieModel.model"
import { StatutInterface } from "./Statut.model"
import { SalleChoisieInterface } from "./SalleChoisieModel.model"

export interface Credentials {
    id?: string,
    imageBase64?: string,
    statut?: string,
    description?: string,
}

export interface ObjetInterface {
    id?: string,
    chambreChoisie?: ChambreChoisieInterface,
    salleChoisie?: SalleChoisieInterface,
    statut?: StatutInterface,
    description?: string,
    photo?: string
    creationDate?: string
}

export interface ObjetsModel{
    globalObjets:ObjetInterface[],
    objetsByStateOther:ObjetInterface[],
    errormessage:string,
    objet: ObjetInterface,
    objetLoading: boolean
}
