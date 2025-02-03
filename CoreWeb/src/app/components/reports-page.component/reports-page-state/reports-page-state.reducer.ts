import { createReducer, on } from "@ngrx/store";
import * as Actions from "./reports-page-state.actions"
import { ReportsState } from "./reports-page-state.state";

var initialStateOfReportsPage: ReportsState = {
    Reports: [],
    Filters: {
        Skip: 0,
        Take: 10,
    },
    ReportsCount: 0,
};

export const ReportsReducer = createReducer<ReportsState>(
    initialStateOfReportsPage,

    //Load Reports
    on(Actions.loadReportsSuccess, (state, { Reports }) => ({
        ...state,
        Reports: Reports.list,
        ReportsCount: Reports.count
    })),

    on(Actions.loadReportsError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Delete Report
    on(Actions.deleteReportSuccess, (state, { RGID }) => {
        let newReports = [...state.Reports];

        let reportsWithoutDeletedReport = newReports.filter(x => x.rgid != RGID);

        return {...state, Reports: reportsWithoutDeletedReport};
    }),

    on(Actions.deleteReportError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Filters
    on(Actions.updatePaginationDataReports, (state, { PaginationData }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            Skip: PaginationData.Skip,
            Take:  PaginationData.Take,
        }
    })),

    on(Actions.cleanState, (state) => ({
        Reports: [],
        Filters: {
            Skip: 0,
            Take: 10,
        },
        ReportsCount: 0,
    })),
) 
