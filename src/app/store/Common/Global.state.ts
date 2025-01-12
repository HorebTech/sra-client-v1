import { AppStateModel } from "../../models/AppState.model";

export const GlobalState: AppStateModel = {
    IsLoading: false,
    authResponse: {

        utilisateur: {
            id: "",
            nom: "",
            email: "",
            connected: false,
            photo: "",
            password: "",
            role: ""
        }
    }
}