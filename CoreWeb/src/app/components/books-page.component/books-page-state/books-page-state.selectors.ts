import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BooksState, featureKeyBooksState } from "./books-page-state.state";

const selectBooksState = createFeatureSelector<BooksState>(featureKeyBooksState)

// export const selectTask = createSelector(selectBooksState, (state: BooksState) => state.Task);

// export const selectTasks = createSelector(selectBooksState, (state: BooksState) => state.Tasks);

// export const selectTasksNotes = createSelector(selectBooksState, (state: BooksState) => state.TasksNotes);

// export const selectTasksSubTasks = createSelector(selectBooksState, (state: BooksState) => state.TasksSubTasks);

// export const selectTasksSubTasksProgressBar = createSelector(selectBooksState, (state: BooksState) => state.TasksSubTasksProgressBar);

// export const selectCategories = createSelector(selectBooksState, (state: BooksState) => state.Categories);

// export const selectFilters = createSelector(selectBooksState, (state: BooksState) => state.Filters);

// export const selectFiltersTasksNotes = createSelector(selectBooksState, (state: BooksState) => state.FiltersTasksNotes);

// export const selectFiltersTasksSubTasks = createSelector(selectBooksState, (state: BooksState) => state.FiltersTasksSubTasks);

// export const selectCount = createSelector(selectBooksState, (state: BooksState) => state.TasksCount);

// export const selectCountTasksNotes  = createSelector(selectBooksState, (state: BooksState) => state.TasksNotesCount);

// export const selectCountTasksSubTasks = createSelector(selectBooksState, (state: BooksState) => state.TasksSubTasksCount);

// export const selectErrors = createSelector(selectBooksState, (state: BooksState) => state.IsError);

// export const selectBudgetOverrunMessage = createSelector(selectBooksState, (state: BooksState) => state.BudgetOverrunMessage);

// export const selectErrorMessage = createSelector(selectBooksState, (state: BooksState) => state.ErrorMessage);