import { NettoyageModel } from "../../models/Nettoyage.model";
import { NettoyageChoisieModel } from "../../models/NettoyageChoisieModel.model";

export const NettoyageState: NettoyageModel = {
    result:[],
    errormessage:"",
    nettoyage: {
        action:"",
        id: "",
        categorie: {
            id: "",
            nom: ""
        }
    }
}

export const NettoyageChoisieState: NettoyageChoisieModel = {
    result:[],
    errormessage:"",
    nettoyageChoisie: {
        id: "",
        nettoyage: {
            id: "",
            action: "",
            categorie: {
                id: "",
                nom: ""
            }
        },
    },
}
