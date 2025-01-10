import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthorsState, featureKeyAuthorsState } from "./authors-page-state.state";

const selectAuthorsState = createFeatureSelector<AuthorsState>(featureKeyAuthorsState)

export const selectAuthor = createSelector(selectAuthorsState, (state: AuthorsState) => state.Author);

export const selectAuthors = createSelector(selectAuthorsState, (state: AuthorsState) => state.Authors);

export const selectFilters = createSelector(selectAuthorsState, (state: AuthorsState) => state.Filters);

export const selectCount = createSelector(selectAuthorsState, (state: AuthorsState) => state.AuthorsCount);

export const selectErrorMessage = createSelector(selectAuthorsState, (state: AuthorsState) => state.ErrorMessage);