import { createAction, props } from '@ngrx/store'

export const loadBook = createAction('[Books Page] Load Book', props<{ BGID: any }>());
export const loadBookSuccess = createAction('[Books Page] Load Book Success', props<{ Book: any }>());
export const loadBookError = createAction('[Books Page] Load Book Error', props<{ error: any }>());

export const loadBooks = createAction('[Books Page] Load Books');
export const loadBooksSuccess = createAction('[Books Page] Load Books Success', props<{ Books: any }>());
export const loadBooksError = createAction('[Books Page] Load Books Error', props<{ error: any }>());

export const addBook = createAction('[Books Page] Add Book', props<{ Book: any }>());
export const addBookSuccess = createAction('Books Page] Add Book Success');
export const addBookError = createAction('[Books Page] Add Book Error', props<{ error: any }>());

export const updateBook = createAction('[Books Page] Update Book', props<{ Book: any }>());
export const updateBookSuccess = createAction('Books Page] Update Book Success');
export const updateBookError = createAction('[Books Page] Update Book Error', props<{ error: any }>());

export const deleteBook = createAction('[Books Page] Delete Book', props<{ bgid: any }>());
export const deleteBookSuccess = createAction('Books Page] Delete Book Success', props<{ tgid: any }>());
export const deleteBookError = createAction('[Books Page] Delete Book Error', props<{ error: any }>());

export const updatePaginationDataBooks = createAction('[Books Page] Update Pagination Data Books', props<{ PaginationData: any }>());

export const cleanState = createAction('[Books Page] Clean State');