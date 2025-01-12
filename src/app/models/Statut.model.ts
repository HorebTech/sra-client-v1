
export interface StatutInterface {
    id?: string
    nom?: string
}

export interface StatutModel{
    result:StatutInterface[],
    errormessage:string,
    statut: StatutInterface
}