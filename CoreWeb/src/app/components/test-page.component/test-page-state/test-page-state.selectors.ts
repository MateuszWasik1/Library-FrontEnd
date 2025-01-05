import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TestState, featureKeyTestState } from "./test-page-state.state";

const selectTestsState = createFeatureSelector<TestState>(featureKeyTestState)

export const selectUsers = createSelector(selectTestsState, (state: TestState) => state.Tests);
