import { createReducer, on } from "@ngrx/store";
import { StatutState } from "./Statut.state";
import { createStatut, deleteStatutSuccess, getStatutOneSuccess, getStatutsFail, getStatutsSuccess, updateStatutSuccess } from "./Statut.action";

const _StatutReducer = createReducer(StatutState,
    on(getStatutsSuccess, (state, action) => {
        return {
            ...state,
            result: action.result,
            errormessage: ""
        }
    }),
    on(getStatutOneSuccess, (state, action) => {
        return {
            ...state,
            categorie: action.result,
            errormessage: ''
        }
    }),
    on(getStatutsFail, (state, action) => {
        return {
            ...state,
            result: [],
            errormessage: action.errormessage
        }
    }),
    on(createStatut, (state, action) => {
        return {
            ...state,
            result: state.result,
            errormessage: ''
        }
    }),
    on(updateStatutSuccess, (state, action) => {
        const _newdata = state.result.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            result: _newdata,
            errormessage: ''
        }
    }),
    on(deleteStatutSuccess, (state, action) => {
        const _newdata = state.result.filter(o=>o.id!==action.id);
        return {
            ...state,
            result: _newdata,
            errormessage: ''
        }
    }),
)


export function StatutReducer(state: any, action: any) {
    return _StatutReducer(state, action);
}
