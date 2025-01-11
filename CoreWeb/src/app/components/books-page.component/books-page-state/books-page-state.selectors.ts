import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BooksState, featureKeyBooksState } from "./books-page-state.state";

const selectBooksState = createFeatureSelector<BooksState>(featureKeyBooksState)

export const selectBook = createSelector(selectBooksState, (state: BooksState) => state.Book);

export const selectBooks = createSelector(selectBooksState, (state: BooksState) => state.Books);

export const selectAuthors = createSelector(selectBooksState, (state: BooksState) => state.Authors);

export const selectPublishers = createSelector(selectBooksState, (state: BooksState) => state.Publishers);

export const selectFilters = createSelector(selectBooksState, (state: BooksState) => state.Filters);

export const selectCount = createSelector(selectBooksState, (state: BooksState) => state.BooksCount);

export const selectErrorMessage = createSelector(selectBooksState, (state: BooksState) => state.ErrorMessage);