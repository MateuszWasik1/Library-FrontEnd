import { createAction, props } from '@ngrx/store'

export const loadAuthor = createAction('[Authors Page] Load Author', props<{ AGID: any }>());
export const loadAuthorSuccess = createAction('[Authors Page] Load Author Success', props<{ Author: any }>());
export const loadAuthorError = createAction('[Authors Page] Load Author Error', props<{ error: any }>());

export const loadAuthors = createAction('[Authors Page] Load Authors');
export const loadAuthorsSuccess = createAction('[Authors Page] Load Authors Success', props<{ Authors: any }>());
export const loadAuthorsError = createAction('[Authors Page] Load Authors Error', props<{ error: any }>());

export const addAuthor = createAction('[Authors Page] Add Author', props<{ Author: any }>());
export const addAuthorSuccess = createAction('Authors Page] Add Author Success');
export const addAuthorError = createAction('[Authors Page] Add Author Error', props<{ error: any }>());

export const updateAuthor = createAction('[Authors Page] Update Author', props<{ Author: any }>());
export const updateAuthorSuccess = createAction('Authors Page] Update Author Success');
export const updateAuthorError = createAction('[Authors Page] Update Author Error', props<{ error: any }>());

export const deleteAuthor = createAction('[Authors Page] Delete Author', props<{ agid: any }>());
export const deleteAuthorSuccess = createAction('Authors Page] Delete Author Success', props<{ agid: any }>());
export const deleteAuthorError = createAction('[Authors Page] Delete Author Error', props<{ error: any }>());

export const updatePaginationDataAuthors = createAction('[Authors Page] Update Pagination Data Authors', props<{ PaginationData: any }>());

export const cleanState = createAction('[Authors Page] Clean State');