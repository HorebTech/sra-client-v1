import { createReducer, on } from "@ngrx/store";
import { CategorieState } from "./Categorie.state";
import { createCategorie, deleteCategorieSuccess, getCategorieOneSuccess, getCategoriesFail, getCategoriesSuccess, updateCategorieSuccess } from "./Categorie.action";

const _CategorieReducer = createReducer(CategorieState,
    on(getCategoriesSuccess, (state, action) => {
        return {
            ...state,
            result: action.result,
            errormessage: ""
        }
    }),
    on(getCategorieOneSuccess, (state, action) => {
        return {
            ...state,
            categorie: action.result,
            errormessage: ''
        }
    }),
    on(getCategoriesFail, (state, action) => {
        return {
            ...state,
            result: [],
            errormessage: action.errormessage
        }
    }),
    on(createCategorie, (state, action) => {
        return {
            ...state,
            result: state.result,
            errormessage: ''
        }
    }),
    on(updateCategorieSuccess, (state, action) => {
        const _newdata = state.result.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            result: _newdata,
            errormessage: ''
        }
    }),
    on(deleteCategorieSuccess, (state, action) => {
        const _newdata = state.result.filter(o=>o.id!==action.id);
        return {
            ...state,
            result: _newdata,
            errormessage: ''
        }
    }),
)


export function CategorieReducer(state: any, action: any) {
    return _CategorieReducer(state, action);
}
