import { createReducer, on } from "@ngrx/store";
import { GlobalState } from "./Global.state";
import { userConnectedSuccess } from "./App.action";

const _AppReducer = createReducer(GlobalState,

    on(userConnectedSuccess, (state, action) => {
        return {
            ...state,
            authResponse: action.userConnected
        }
    })
);

export function AppReducer(state: any, action: any){
    return _AppReducer(state, action);
}
