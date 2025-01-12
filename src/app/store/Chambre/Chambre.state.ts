import { GlobalChambreModel } from "../../models/Chambre.model"
import { ChambreChoisieModel } from "../../models/ChambreChoisieModel.model"

export const ChambreState: GlobalChambreModel = {
    result: [],
    errormessage:"",
    chambre: {
        id: "",
        numero: "",
        localisation: "",
        categorie: {
            id: "",
            nom: ""
        },
        statut: {
            id: "",
            nom: ""
        }
    },
    chambresByState: [],
    chambresPropres: [],
    chambresEnCoursDeNettoyage: []
}

export const ChambreChoisieState: ChambreChoisieModel = {
    result:[],
    errormessage:"",
    chambreChoisie: {
        id: "",
        chambre: {
            id: "",
            numero: "",
            localisation: "",
            categorie: {
                id: "",
                nom: ""
            },
            statut: {
                id: "",
                nom: ""
            }
        },
        duree: "",
        heureDebut: "",
        heureFin: "",
        panne: [],
        objet: []
    },
}


