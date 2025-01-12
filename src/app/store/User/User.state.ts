import { createEntityAdapter } from "@ngrx/entity";
import { UserModel, Utilisateur } from "../../models/User.model";

export const UserAdapter = createEntityAdapter<Utilisateur>();

export const UserState: UserModel = UserAdapter.getInitialState({
    userInfo: {
        id: "",
        nom: "",
        email: "",
        connected: false,
        photo: "",
        role: ""
    },
    allUsers: [],
    isUserExisted: false,
    menulist:[]
})
