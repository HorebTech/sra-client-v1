import { PannesModel } from "../../models/Panne.model";

export const PanneState: PannesModel = {
    globalPannes:[],
    globalPanneInRoom:[],
    pannesByStateAndOther:[],
    panneDuJour:[],
    pannesByDay:[],
    pannesByDates:[],
    countByMarque:[],
    errormessage:"",
    panne: {
        id: "",
        chambreChoisie: {
            id: ""
        },
        salleChoisie: {
            id: ""
        },
        nomEquipement: "",
        date: "",
        statut: {
            id: '',
            nom: ""
        },
        description: "",
        photo: "",
        creationDate: "",
        marqueEquipement: {
            id: "",
            nom: ""
        },
    },
    panneLoading: false
}
