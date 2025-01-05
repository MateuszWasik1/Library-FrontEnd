import { createAction, props } from '@ngrx/store'

export const loadTest = createAction('[Test Page] Load Test');
export const loadTestSuccess = createAction('[Test Page] Load Test Success', props<{ Users: any }>());
export const loadTestError = createAction('[Test Page] Load Test Error', props<{ error: any }>());

export const cleanState = createAction('[Test Page] Clean State');