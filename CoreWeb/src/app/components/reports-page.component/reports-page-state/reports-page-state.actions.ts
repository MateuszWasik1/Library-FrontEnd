import { createAction, props } from '@ngrx/store'

export const loadReports = createAction('[Reports Page] Load Reports');
export const loadReportsSuccess = createAction('[Reports Page] Load Reports Success', props<{ Reports: any }>());
export const loadReportsError = createAction('[Reports Page] Load Reports Error', props<{ error: any }>());

export const updatePaginationDataReports = createAction('[Reports Page] Update Pagination Data Reports', props<{ PaginationData: any }>());

export const cleanState = createAction('[Reports Page] Clean State');