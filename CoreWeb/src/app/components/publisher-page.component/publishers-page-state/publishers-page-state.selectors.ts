import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PublishersState, featureKeyPublishersState } from "./publishers-page-state.state";

const selectPublishersState = createFeatureSelector<PublishersState>(featureKeyPublishersState)

export const selectPublisher = createSelector(selectPublishersState, (state: PublishersState) => state.Publisher);

export const selectPublishers = createSelector(selectPublishersState, (state: PublishersState) => state.Publishers);

export const selectFilters = createSelector(selectPublishersState, (state: PublishersState) => state.Filters);

export const selectCount = createSelector(selectPublishersState, (state: PublishersState) => state.PublishersCount);

export const selectErrorMessage = createSelector(selectPublishersState, (state: PublishersState) => state.ErrorMessage);