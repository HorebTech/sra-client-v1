import { TacheInterface } from "./Tache.model"

export interface CredentialTacheChoisie {
    passeId: number,
    action: string,
}

export interface TacheChoisieInterface {
    id?: string,
    tache?: TacheInterface
}

export interface TacheChoisieModel{
    result:TacheChoisieInterface[],
    errormessage:string,
    tacheChoisie: TacheChoisieInterface
}