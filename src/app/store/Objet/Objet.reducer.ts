import { createReducer, on } from "@ngrx/store";
import { ObjetState } from "./Objet.state";
import { deleteObjet, deleteObjetSuccess, getAllObjetsByStateAndOtherSuccess, getObjet, getObjetsFail, getObjetsSuccess, getObjetSuccess, saveObjet, updateObjet } from "./Objet.action";


const _ObjetReducer = createReducer(ObjetState,
    on(saveObjet, (state, action) => {
        return {
            ...state,
            objet: state.objet,
            errormessage: ''
        }
    }),
    on(updateObjet, (state, action) => {
        return {
            ...state,
            objet: state.objet,
            errormessage: ''
        }
    }),
    on(getObjetSuccess, (state, action) => {
        return {
            ...state,
            objet: action.objet,
            errormessage: ""
        }
    }),
    on(deleteObjetSuccess, (state, action) => {
        const _newObjets = state.objetsByStateOther.filter(o=>o.id!==action.id);
        return {
            ...state,
            objetsByStateOther: _newObjets,
            errormessage: ''
        }
    }),
    on(getAllObjetsByStateAndOtherSuccess, (state, action) => {
        return {
            ...state,
            objetsByStateOther: action.objetsByStateOther,
            errormessage: ''
        }
    }),
    on(getObjetsSuccess, (state, action) => {
        return {
            ...state,
            globalObjets: action.globalObjets,
            errormessage: ''
        }
    })
)


export function ObjetReducer(state: any, action: any) {
    return _ObjetReducer(state, action);
}
