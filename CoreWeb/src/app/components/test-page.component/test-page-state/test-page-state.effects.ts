import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as TestActions from "./test-page-state.actions"
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";
import { TestService } from "src/app/services/test.service";

@Injectable()
export class TestEffects {
    constructor(
        private actions: Actions,
        private testService: TestService,
        private errorHandler: APIErrorHandler) {
    }
    
    loadTests = createEffect(() => {
        return this.actions.pipe(
            ofType(TestActions.loadTest),
            switchMap((params) => {
                return this.testService.GetTests().pipe(
                    map((result) => TestActions.loadTestSuccess({ Users: result })),
                    catchError(error => of(TestActions.loadTestError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })
}