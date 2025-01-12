import { createReducer, on } from "@ngrx/store";
import { MarqueState } from "./Marque.state";
import { createMarque, deleteMarqueSuccess, getMarqueOneSuccess, getMarquesFail, getMarquesSuccess, updateMarqueSuccess } from "./Marque.action";

const _MarqueReducer = createReducer(MarqueState,
    on(getMarquesSuccess, (state, action) => {
        return {
            ...state,
            result: action.result,
            errormessage: ""
        }
    }),
    on(getMarqueOneSuccess, (state, action) => {
        return {
            ...state,
            marque: action.result,
            errormessage: ''
        }
    }),
    on(getMarquesFail, (state, action) => {
        return {
            ...state,
            result: [],
            errormessage: action.errormessage
        }
    }),
    on(createMarque, (state, action) => {
        return {
            ...state,
            result: state.result,
            errormessage: ''
        }
    }),
    on(updateMarqueSuccess, (state, action) => {
        const _newdata = state.result.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            result: _newdata,
            errormessage: ''
        }
    }),
    on(deleteMarqueSuccess, (state, action) => {
        const _newdata = state.result.filter(o=>o.id!==action.id);
        return {
            ...state,
            result: _newdata,
            errormessage: ''
        }
    }),
)


export function MarqueReducer(state: any, action: any) {
    return _MarqueReducer(state, action);
}
