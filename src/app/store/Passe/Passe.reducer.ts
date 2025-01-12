import { createReducer, on } from "@ngrx/store";
import { PasseState } from "./Passe.state";
import { deletePasse, findCurrentPasses, findCurrentPassesSuccess, findGlobalPassesFail, findGlobalPassesSuccess, findNewAndCurrentPassesSuccess, findNewPassesSuccess, findPasseOneSuccess, findPassesByStateAndDateSuccess, resetPasse } from "./Passe.action";

const _passeReducer = createReducer(PasseState,
    on(findGlobalPassesSuccess, (state, action) => {
        return {
            ...state,
            globalPasses: action.globalPasses,
            errormessage: ""
        }
    }),
    on(findPassesByStateAndDateSuccess, (state, action) => {
        return {
            ...state,
            userPassesDay: action.userPassesDay,
            errormessage: ""
        }
    }),
    on(findNewAndCurrentPassesSuccess, (state, action) => {
        return {
            ...state,
            newsPassesActifs: action.newsPassesActifs,
            errormessage: ""
        }
    }),
    on(findNewPassesSuccess, (state, action) => {
        return {
            ...state,
            newsPasses: action.result,
            errormessage: ""
        }
    }),
    on(findCurrentPassesSuccess, (state, action) => {
        return {
            ...state,
            currentPasses: action.result,
            errormessage: ""
        }
    }),
    on(findPasseOneSuccess, (state, action) => {
        return {
            ...state,
            passe: action.passe,
            errormessage: ''
        }
    }),
    on(findGlobalPassesFail, (state, action) => {
        return {
            ...state,
            result: [],
            errormessage: action.errormessage
        }
    }),
    on(resetPasse, (state, action) => {
        return {
            ...state,
            passe: {
                id: 0,
                agent: {
                    nom: ""
                },
                chambreChoisie: [],
                dateNettoyage: "",
                nettoyageChoisie: [],
                salleChoisie: [],
                statut: {
                    id: '',
                    nom: ''
                },
                tacheChoisie: []
            },
            errormessage: ""
        }
    }),
    on(deletePasse, (state, action) => {
        const _newPasses = state.globalPasses.filter(o=>o.id!==action.id);
        return {
            ...state,
            result: _newPasses,
            errormessage: ''
        }
    }),
)


export function PasseReducer(state: any, action: any) {
    return _passeReducer(state, action);
}
