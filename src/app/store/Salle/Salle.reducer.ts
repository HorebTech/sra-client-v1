import { createReducer, on } from "@ngrx/store";
import { SalleChoisieState, SalleState } from "./Salle.state";
import { deleteSalle, getAllSallesByStateSuccess, getAllSallesChoisieSuccess, getAllSallesEnNettoyageSuccess, getAllSallesPropresSuccess, getAllSallesSuccess, getSalleChoisieSuccess, getSalleSuccess, saveSalle, saveSalleChoisie, updateSalle, updateSalleChoisie } from "./Salle.action";

const _SalleReducer = createReducer(SalleState,
    on(saveSalle, (state, action) => {
        return {
            ...state,
            salle: state.salle,
            errormessage: ''
        }
    }),
    on(updateSalle, (state, action) => {
        return {
            ...state,
            salle: state.salle,
            errormessage: ''
        }
    }),
    on(getSalleSuccess, (state, action) => {
        return {
            ...state,
            salle: action.salle,
            errormessage: ""
        }
    }),
    on(getAllSallesSuccess, (state, action) => {
        return {
            ...state,
            result: action.result,
            errormessage: ""
        }
    }),
    on(getAllSallesByStateSuccess, (state, action) => {
        return {
            ...state,
            result: action.result,
            errormessage: ""
        }
    }),
    on(getAllSallesPropresSuccess, (state, action) => {
        return {
            ...state,
            sallesPropres: action.result,
            errormessage: ""
        }
    }),
    on(getAllSallesEnNettoyageSuccess, (state, action) => {
        return {
            ...state,
            sallesEnNettoyage: action.result,
            errormessage: ""
        }
    })
)


export function SalleReducer(state: any, action: any) {
    return _SalleReducer(state, action);
}


/************************************************************************************************** */
/*                                         CHAMBRE CHOISIE                                          */
/************************************************************************************************** */

const _SalleChoisieReducer = createReducer(SalleChoisieState,
    on(saveSalleChoisie, (state, action) => {
        return {
            ...state,
            salleChoisie: state.salleChoisie,
            errormessage: ''
        }
    }),
    on(updateSalleChoisie, (state, action) => {
        return {
            ...state,
            salleChoisie: state.salleChoisie,
            errormessage: ''
        }
    }),
    on(getSalleChoisieSuccess, (state, action) => {
        return {
            ...state,
            salleChoisie: action.salleChoisie,
            errormessage: ""
        }
    }),
    on(getAllSallesChoisieSuccess, (state, action) => {
        return {
            ...state,
            result: action.result,
            errormessage: ""
        }
    })
)


export function SalleChoisieReducer(state: any, action: any) {
    return _SalleChoisieReducer(state, action);
}