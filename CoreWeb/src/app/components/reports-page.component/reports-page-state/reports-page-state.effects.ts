import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import * as ReportsActions from "./reports-page-state.actions"
import { Store } from "@ngrx/store";
import { AppState } from "../../../app.state";
import { APIErrorHandler } from "../../../error-handlers/api-error-handler";
import { selectFilters } from "./reports-page-state.selectors";
import { ReportsService } from "../../../services/reports.service";

@Injectable()
export class ReportsEffects {
    constructor(
        private actions: Actions,
        private reportsService: ReportsService,
        public store: Store<AppState>,
        private errorHandler: APIErrorHandler) {
    }

    loadReports = createEffect(() => {
        return this.actions.pipe(
            ofType(ReportsActions.loadReports),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap((params) => {
                return this.reportsService.GetReports(params[1].Skip, params[1].Take).pipe(
                    map((result) => ReportsActions.loadReportsSuccess({ Reports: result })),
                    catchError(error => of(ReportsActions.loadReportsError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    });

    deleteReport = createEffect(() => {
        return this.actions.pipe(
            ofType(ReportsActions.deleteReport),
            switchMap((params) => {
                return this.reportsService.DeleteReport(params.RGID).pipe(
                    map(() => ReportsActions.deleteReportSuccess({ RGID: params.RGID })),
                    catchError(error => of(ReportsActions.deleteReportError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });
}