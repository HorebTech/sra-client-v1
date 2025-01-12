
export interface MarqueInterface {
    id?: string
    nom?: string
}

export interface MarqueModel{
    result:MarqueInterface[],
    errormessage:string,
    marque: MarqueInterface
}