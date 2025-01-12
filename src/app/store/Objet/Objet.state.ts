import { ObjetsModel } from "../../models/Objet.model";

export const ObjetState: ObjetsModel = {
    globalObjets:[],
    objetsByStateOther:[],
    errormessage:"",
    objet: {
        id: "",
        chambreChoisie: {
            chambre: {
                numero: ''
            }
        },
        photo: "",
        salleChoisie: {
            salle: {
                numero: ""
            }
        },
        statut: {
            nom: ""
        },
        description: "",
        creationDate: "",
    },
    objetLoading: false
}