import { createAction, props } from '@ngrx/store'

export const loadReports = createAction('[Reports Page] Load Reports');
export const loadReportsSuccess = createAction('[Reports Page] Load Reports Success', props<{ Reports: any }>());
export const loadReportsError = createAction('[Reports Page] Load Reports Error', props<{ error: any }>());

export const deleteReport = createAction('[Reports Page] Delete Report', props<{ RGID: any }>());
export const deleteReportSuccess = createAction('[Reports Page] Delete Report Success', props<{ RGID: any }>());
export const deleteReportError = createAction('[Reports Page] Delete Report Error', props<{ error: any }>());

export const updatePaginationDataReports = createAction('[Reports Page] Update Pagination Data Reports', props<{ PaginationData: any }>());

export const cleanState = createAction('[Reports Page] Clean State');