import { createAction, props } from '@ngrx/store'

export const loadPublisher = createAction('[Publishers Page] Load Publisher', props<{ PGID: any }>());
export const loadPublisherSuccess = createAction('[Publishers Page] Load Publisher Success', props<{ Publisher: any }>());
export const loadPublisherError = createAction('[Publishers Page] Load Publisher Error', props<{ error: any }>());

export const loadPublishers = createAction('[Publishers Page] Load Publishers');
export const loadPublishersSuccess = createAction('[Publishers Page] Load Publishers Success', props<{ Publishers: any }>());
export const loadPublishersError = createAction('[Publishers Page] Load Publishers Error', props<{ error: any }>());

export const addPublisher = createAction('[Publishers Page] Add Publisher', props<{ Publisher: any }>());
export const addPublisherSuccess = createAction('Publishers Page] Add Publisher Success');
export const addPublisherError = createAction('[Publishers Page] Add Publisher Error', props<{ error: any }>());

export const updatePublisher = createAction('[Publishers Page] Update Publisher', props<{ Publisher: any }>());
export const updatePublisherSuccess = createAction('Publishers Page] Update Publisher Success');
export const updatePublisherError = createAction('[Publishers Page] Update Publisher Error', props<{ error: any }>());

export const deletePublisher = createAction('[Publishers Page] Delete Publisher', props<{ pgid: any }>());
export const deletePublisherSuccess = createAction('[Publishers Page] Delete Publisher Success', props<{ pgid: any }>());
export const deletePublisherError = createAction('[Publishers Page] Delete Publisher Error', props<{ error: any }>());

export const updatePaginationDataPublishers = createAction('[Publishers Page] Update Pagination Data Publishers', props<{ PaginationData: any }>());

export const cleanState = createAction('[Publishers Page] Clean State');