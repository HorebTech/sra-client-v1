import { TacheModel } from "../../models/Tache.model";
import { TacheChoisieModel } from "../../models/TacheChoisieModel.model";

export const TacheState: TacheModel = {
    result:[],
    errormessage:"",
    tache: {
        action:"",
        id: "",
        categorie: {
            id: "",
            nom: ""
        },
        sous_categorie: {
            id: "",
            nom: ""
        }
    }
}

export const TacheChoisieState: TacheChoisieModel = {
    result:[],
    errormessage:"",
    tacheChoisie: {
        id: "",
        tache: {
            id: "",
            action: "",
            categorie: {
                id: "",
                nom: ""
            },
            sous_categorie: {
                id: "",
                nom: ""
            }
        },
    },
}
