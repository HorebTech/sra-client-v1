import { createReducer, on } from "@ngrx/store";
import { PanneState } from "./Panne.state";
import { counterByMarqueSuccess, deletePanne, getAllPannesByDatesSuccess, getAllPannesByDay, getAllPannesByDaySuccess, getAllPannesByStateAndOtherSuccess, getPannesFail, getPannesInRoomSuccess, getPannesSuccess, getPanneSuccess, getTopChambreSuccess, savePanne, updatePanne } from "./Panne.action";


const _PanneReducer = createReducer(PanneState,
    
    on(savePanne, (state, action) => {
        return {
            ...state,
            panne: state.panne,
            errormessage: ''
        }
    }),
    on(getPanneSuccess, (state, action) => {
        return {
            ...state,
            panne: action.panne,
            errormessage: ""
        }
    }),
    on(getAllPannesByDaySuccess, (state, action) => {
        return {
            ...state,
            pannesByDay: action.result,
            errormessage: ""
        }
    }),
    on(getAllPannesByDatesSuccess, (state, action) => {
        return {
            ...state,
            pannesByDates: action.result,
            errormessage: ""
        }
    }),
    on(getPannesInRoomSuccess, (state, action) => {
        return {
            ...state,
            globalPanneInRoom: action.result,
            errormessage: ""
        }
    }),
    on(getTopChambreSuccess, (state, action) => {
        return {
            ...state,
            globalPanneInRoom: action.result,
            errormessage: ""
        }
    }),
    on(deletePanne, (state, action) => {
        const _newPannes = state.pannesByStateAndOther.filter(o=>o.id!==action.id);
        return {
            ...state,
            result: _newPannes,
            errormessage: ''
        }
    }),
    on(getAllPannesByStateAndOtherSuccess, (state, action) => {
        return {
            ...state,
            pannesByStateAndOther: action.pannesByStateAndOther,
            errormessage: ''
        }
    }),
    on(getPannesSuccess, (state, action) => {
        return {
            ...state,
            globalPannes: action.globalPannes,
            errormessage: ''
        }
    }),
    on(counterByMarqueSuccess, (state, action) => {
        return {
            ...state,
            countByMarque: action.result,
            errormessage: ''
        }
    })
)


export function PanneReducer(state: any, action: any) {
    return _PanneReducer(state, action);
}
