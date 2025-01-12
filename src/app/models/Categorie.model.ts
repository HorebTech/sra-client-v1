
export interface CategorieInterface {
    id?: string
    nom?: string
}

export interface CategorieModel{
    result:CategorieInterface[],
    errormessage:string,
    categorie: CategorieInterface
}