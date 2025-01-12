import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserAdapter } from "./User.state";
import { UserModel } from "../../models/User.model";

const getUserState = createFeatureSelector<UserModel>('utilisateur');

const userselector = UserAdapter.getSelectors();

export const checkIfUserExisted = createSelector(getUserState, (state) => state.isUserExisted);

export const getmenubyrole = createSelector(getUserState, (state) => state.menulist);

export const getUserlist = createSelector(getUserState, userselector.selectAll)

// // export const getallroles = createSelector(getUserState, (state) => state.roles);

// export const getUserbycode = createSelector(getUserState, (state) => state.userInfo);