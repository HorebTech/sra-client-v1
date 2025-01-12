import { createReducer, on } from "@ngrx/store";
import { NettoyageChoisieState, NettoyageState } from "./Nettoyage.state";
import { deleteNettoyageSuccess, getAllNettoyagesChoisiesSuccess, getAllNettoyagesFail, getAllNettoyagesSuccess, getNettoyageChoisieSuccess, getNettoyageSuccess, saveNettoyage, saveNettoyageChoisie, updateNettoyageSuccess } from "./Nettoyage.action";


const _NettoyageReducer = createReducer(NettoyageState,
    on(getAllNettoyagesSuccess, (state, action) => {
        return {
            ...state,
            result: action.result,
            errormessage: ""
        }
    }),
    on(getNettoyageSuccess, (state, action) => {
        return {
            ...state,
            nettoyage: action.nettoyage,
            errormessage: ''
        }
    }),
    on(getAllNettoyagesFail, (state, action) => {
        return {
            ...state,
            result: [],
            errormessage: action.errormessage
        }
    }),
    on(saveNettoyage, (state, action) => {
        return {
            ...state,
            result: state.result,
            errormessage: ''
        }
    }),

    on(deleteNettoyageSuccess, (state, action) => {
        const _newdata = state.result.filter(o => o.id!==action.id);
        return {
            ...state,
            result: _newdata,
            errormessage: ''
        }
    }),
)

export function NettoyageReducer(state: any, action: any) {
    return _NettoyageReducer(state, action);
}


/************************************************************************************************** */
/*                                         NETTOYAGE CHOISIE                                          */
/************************************************************************************************** */

const _NettoyageChoisieReducer = createReducer(NettoyageChoisieState,
    on(saveNettoyageChoisie, (state, action) => {
        return {
            ...state,
            nettoyageChoisie: state.nettoyageChoisie,
            errormessage: ''
        }
    }),
    on(getNettoyageChoisieSuccess, (state, action) => {
        return {
            ...state,
            nettoyageChoisie: action.nettoyageChoisie,
            errormessage: ""
        }
    }),
    on(getAllNettoyagesChoisiesSuccess, (state, action) => {
        return {
            ...state,
            result: action.result,
            errormessage: ""
        }
    })
)


export function NettoyageChoisieReducer(state: any, action: any) {
    return _NettoyageChoisieReducer(state, action);
}