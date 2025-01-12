import { AuthResponse, Utilisateur } from "./User.model";

export interface AppStateModel{
    IsLoading: boolean;
    authResponse: AuthResponse;
}

