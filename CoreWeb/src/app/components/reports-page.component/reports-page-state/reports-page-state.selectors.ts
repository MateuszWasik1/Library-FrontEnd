import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReportsState, featureKeyReportsState } from "./reports-page-state.state";

const selectReportsState = createFeatureSelector<ReportsState>(featureKeyReportsState)

export const selectReports = createSelector(selectReportsState, (state: ReportsState) => state.Reports);

export const selectFilters = createSelector(selectReportsState, (state: ReportsState) => state.Filters);

export const selectCount = createSelector(selectReportsState, (state: ReportsState) => state.ReportsCount);