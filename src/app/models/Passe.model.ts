import { ChambreChoisieInterface } from "./ChambreChoisieModel.model"
import { NettoyageChoisieInterface } from "./NettoyageChoisieModel.model"
import { SalleChoisieInterface } from "./SalleChoisieModel.model"
import { StatutInterface } from "./Statut.model"
import { TacheChoisieInterface } from "./TacheChoisieModel.model"
import { Utilisateur } from "./User.model"

export interface Credentials {
        id?: number,
        agent?: string,
        statut?: string,
        commentaire?: string,
        dateNettoyage?: string,
}

export interface PasseInterface {
        id?: number,
        agent?: Utilisateur,
        statut?: StatutInterface,
        dateNettoyage?: string,
        commentaire?: string,
        nettoyageChoisie?: NettoyageChoisieInterface[],
        tacheChoisie?: TacheChoisieInterface[],
        chambreChoisie?: ChambreChoisieInterface[]
        salleChoisie?: SalleChoisieInterface[]
}
export interface PasseModel{
        globalPasses:PasseInterface[],
        userPasses:PasseInterface[],
        userPassesDay:PasseInterface[],
        newsPassesActifs:PasseInterface[],
        newsPasses:PasseInterface[],
        currentPasses:PasseInterface[],
        errormessage:string,
        passe: PasseInterface
    }