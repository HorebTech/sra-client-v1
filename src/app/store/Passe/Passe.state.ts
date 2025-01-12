import { PasseModel } from "../../models/Passe.model"

export const PasseState: PasseModel = {
    globalPasses: [],
    userPasses: [],
    userPassesDay: [],
    newsPasses: [],
    currentPasses: [],
    passe: {
        id: 0,
        agent: {
            nom: ""
        },
        chambreChoisie: [],
        dateNettoyage: "",
        commentaire: "",
        nettoyageChoisie: [],
        salleChoisie: [],
        statut: {
            id: '',
            nom: ''
        },
        tacheChoisie: []
    },
    newsPassesActifs: [],
    errormessage: ""
}

