import { createReducer, on } from "@ngrx/store";
import { UserState, UserAdapter } from "./User.state";
import { fetchmenusuccess, getUserByNameSuccess, getUtilisateursSuccess, updateUtilisateurByAdminSuccess, updateUtilisateurSuccess } from "./User.action";


const _userReducer = createReducer(UserState,

    on(getUserByNameSuccess, (state, action) => {
        return { 
            ...state, 
            isUserExisted: action.isUserExisted 
        }
    }),
    on(fetchmenusuccess, (state, action) => {
        return { 
            ...state, 
            menulist: action.menulist 
        }
    }),

    on(getUtilisateursSuccess, (state, action) => {
        return UserAdapter.setAll(action.userlist, state)
    }),

    on(updateUtilisateurSuccess, (state, action) => {
        const _newdata = state.userInfo
        return {
            ...state,
            userInfo: _newdata,
            errormessage: ''
        }
    }),
    on(updateUtilisateurByAdminSuccess, (state, action) => {
        const _newdata = state.userInfo
        return {
            ...state,
            userInfo: _newdata,
            errormessage: ''
        }
    }),
)

export function UserReducer(state: any, action: any) {
    return _userReducer(state, action);
}