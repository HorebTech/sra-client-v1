import { ChambreChoisieInterface } from "./ChambreChoisieModel.model"
import { StatutInterface } from "./Statut.model"
import { SalleChoisieInterface } from "./SalleChoisieModel.model"
import { MarqueInterface } from "./Marque.model"

export interface PanneCountMarque {
    total: number,
    marque: string
}

export interface PanneInterface {
    id?: string,
    description?: string,
    chambreChoisie?: ChambreChoisieInterface,
    salleChoisie?: SalleChoisieInterface,
    nomEquipement?: string,
    date?: string,
    marqueEquipement?: MarqueInterface,
    statut?: StatutInterface,
    photo?: string
    creationDate?: string
}

export interface PanneCredentials {
    id?: string,
    imageBase64?: string,
    nomEquipement?: string,
    marqueEquipement?: string,
    date?: string,
    statut?: string,
    description?: string,
}

export interface PannesModel{
    globalPannes:PanneInterface[],
    panneDuJour:PanneInterface[],
    pannesByStateAndOther:PanneInterface[],
    pannesByDay:PanneInterface[],
    pannesByDates:PanneInterface[],
    globalPanneInRoom:PanneInterface[],
    countByMarque: PanneCountMarque[],
    errormessage:string,
    panne: PanneInterface,
    panneLoading: boolean
}
