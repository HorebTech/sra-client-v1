import { createReducer, on } from "@ngrx/store";
import { ChambreChoisieState, ChambreState } from "./Chambre.state";
import { deleteChambre, getAllChambresByStateSuccess, getAllChambresChoisieSuccess, getAllChambresEnNettoyagesSuccess, getAllChambresPropresSuccess, getAllChambresSuccess, getChambreChoisieSuccess, getChambreSuccess, saveChambre, saveChambreChoisie, updateChambre, updateChambreChoisie } from "./Chambre.action";

const _ChambreReducer = createReducer(ChambreState,
    on(saveChambre, (state, action) => {
        return {
            ...state,
            chambre: state.chambre,
            errormessage: ''
        }
    }),
    on(updateChambre, (state, action) => {
        return {
            ...state,
            chambre: state.chambre,
            errormessage: ''
        }
    }),
    on(getChambreSuccess, (state, action) => {
        return {
            ...state,
            chambre: action.chambre,
            errormessage: ""
        }
    }),
    on(getAllChambresSuccess, (state, action) => {
        return {
            ...state,
            result: action.result,
            errormessage: ""
        }
    }),
    on(getAllChambresPropresSuccess, (state, action) => {
        return {
            ...state,
            chambresPropres: action.result,
            errormessage: ""
        }
    }),
    on(getAllChambresEnNettoyagesSuccess, (state, action) => {
        return {
            ...state,
            chambresEnCoursDeNettoyage: action.result,
            errormessage: ""
        }
    }),
    on(getAllChambresByStateSuccess, (state, action) => {
        return {
            ...state,
            result: action.result,
            errormessage: ""
        }
    })
)


export function ChambreReducer(state: any, action: any) {
    return _ChambreReducer(state, action);
}


/************************************************************************************************** */
/*                                         CHAMBRE CHOISIE                                          */
/************************************************************************************************** */

const _ChambreChoisieReducer = createReducer(ChambreChoisieState,
    on(saveChambreChoisie, (state, action) => {
        return {
            ...state,
            chambreChoisie: state.chambreChoisie,
            errormessage: ''
        }
    }),
    on(updateChambreChoisie, (state, action) => {
        return {
            ...state,
            chambreChoisie: state.chambreChoisie,
            errormessage: ''
        }
    }),
    on(getChambreChoisieSuccess, (state, action) => {
        return {
            ...state,
            chambreChoisie: action.chambreChoisie,
            errormessage: ""
        }
    }),
    on(getAllChambresChoisieSuccess, (state, action) => {
        return {
            ...state,
            result: action.result,
            errormessage: ""
        }
    })
)


export function ChambreChoisieReducer(state: any, action: any) {
    return _ChambreChoisieReducer(state, action);
}