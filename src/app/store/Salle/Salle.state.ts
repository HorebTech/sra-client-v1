import { SalleModel } from "../../models/Salle.model"
import { SalleChoisieModel } from "../../models/SalleChoisieModel.model"

export const SalleState: SalleModel = {
    result: [],
    errormessage:"",
    salle: {
        id: "",
        numero: "",
        description: "",
        statut: {
            id: "",
            nom: ""
        }
    },
    sallesByState: [],
    sallesPropres: [],
    sallesEnCoursDeNettoyage: []
}

export const SalleChoisieState: SalleChoisieModel = {
    result:[],
    errormessage:"",
    salleChoisie: {
        duree: '',
        heureDebut: '',
        heureFin: '',
        id: '',
        objet: [],
        panne: [],
        salle: {
            description: '',
            id: '',
            numero: '',
            statut: {
                id: '',
                nom: ''
            }
        }
    }
}


