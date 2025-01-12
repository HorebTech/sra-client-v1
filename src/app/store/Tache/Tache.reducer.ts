import { createReducer, on } from "@ngrx/store";
import { TacheChoisieState, TacheState } from "./Tache.state";
import { deleteTacheSuccess, getAllTachesChoisiesSuccess, getAllTachesFail, getAllTachesSuccess, getTacheChoisieSuccess, getTacheSuccess, saveTache, saveTacheChoisie, updateTacheSuccess } from "./Tache.action";


const _TacheReducer = createReducer(TacheState,
    on(getAllTachesSuccess, (state, action) => {
        return {
            ...state,
            result: action.result,
            errormessage: ""
        }
    }),
    on(getTacheSuccess, (state, action) => {
        return {
            ...state,
            tache: action.tache,
            errormessage: ''
        }
    }),
    on(getAllTachesFail, (state, action) => {
        return {
            ...state,
            result: [],
            errormessage: action.errormessage
        }
    }),
    on(saveTache, (state, action) => {
        return {
            ...state,
            result: state.result,
            errormessage: ''
        }
    }),

    on(deleteTacheSuccess, (state, action) => {
        const _newdata = state.result.filter(o => o.id!==action.id);
        return {
            ...state,
            result: _newdata,
            errormessage: ''
        }
    }),
)

export function TacheReducer(state: any, action: any) {
    return _TacheReducer(state, action);
}


/************************************************************************************************** */
/*                                         TACHE CHOISIE                                          */
/************************************************************************************************** */

const _TacheChoisieReducer = createReducer(TacheChoisieState,
    on(saveTacheChoisie, (state, action) => {
        return {
            ...state,
            tacheChoisie: state.tacheChoisie,
            errormessage: ''
        }
    }),
    on(getTacheChoisieSuccess, (state, action) => {
        return {
            ...state,
            tacheChoisie: action.tacheChoisie,
            errormessage: ""
        }
    }),
    on(getAllTachesChoisiesSuccess, (state, action) => {
        return {
            ...state,
            result: action.result,
            errormessage: ""
        }
    })
)


export function TacheChoisieReducer(state: any, action: any) {
    return _TacheChoisieReducer(state, action);
}