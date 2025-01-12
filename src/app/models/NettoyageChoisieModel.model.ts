import { NettoyageInterface } from "./Nettoyage.model";

export interface CredentialNettoyageChoisit {
    passeId: number,
    action: string,
}

export interface NettoyageChoisieInterface {
    id?: string,
    nettoyage?: NettoyageInterface
}

export interface NettoyageChoisieModel{
    result:NettoyageChoisieInterface[],
    errormessage:string,
    nettoyageChoisie: NettoyageChoisieInterface
}