import { createReducer, on } from "@ngrx/store";
import { initialState } from "./Dialog.state";
import { aboutDialog, usedConditionDialog } from "./Dialog.action";

const _showDialogReducer = createReducer(initialState,
    on(usedConditionDialog, (state) => {
        return {
            ...state,
            showUsedCondition: !state.showUsedCondition
        }
    }),

    on(aboutDialog, (state) => {
        return {
            ...state,
            showApropos: !state.showApropos
        }
    }),
)

export function ShowDialogReducer(state: any, action: any) {
    return _showDialogReducer(state, action);
}