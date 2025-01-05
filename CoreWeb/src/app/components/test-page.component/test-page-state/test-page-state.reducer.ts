import { createReducer, on } from "@ngrx/store";
import * as Actions from "./test-page-state.actions"
import { TestState } from "./test-page-state.state";

var initialStateOfTestPage: TestState = {
    Tests: [],
};

export const TestReducer = createReducer<TestState>(
    initialStateOfTestPage,

    on(Actions.loadTestSuccess, (state, { Users }) => ({
        ...state,
        Tests: Users,
    })),

    on(Actions.cleanState, (state) => ({
        ...state,
        Tests: [],
    })),
) 