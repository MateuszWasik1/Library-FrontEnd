import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState, featureKeyUsersState } from "./users-page-state.state";

const selectUsersState = createFeatureSelector<UsersState>(featureKeyUsersState)

export const selectUsers = createSelector(selectUsersState, (state: UsersState) => state.Users);

export const selectFilters= createSelector(selectUsersState, (state: UsersState) => state.Filters);

export const selectCount= createSelector(selectUsersState, (state: UsersState) => state.UsersCount);

export const selectErrorMessage = createSelector(selectUsersState, (state: UsersState) => state.ErrorMessage);