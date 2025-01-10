import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import * as PublishersActions from "./publishers-page-state.actions"
import { Store } from "@ngrx/store";
import { AppState } from "../../../app.state";
import { APIErrorHandler } from "../../../error-handlers/api-error-handler";
import { Router } from "@angular/router";
import { selectFilters } from "./publishers-page-state.selectors";
import { PublishersService } from "../../../services/publishers.service";

@Injectable()
export class PublishersEffects {
    constructor(
        private actions: Actions,
        private router: Router,
        private publishersService: PublishersService,
        public store: Store<AppState>,
        private errorHandler: APIErrorHandler) {
    }

    loadPublisher = createEffect(() => {
        return this.actions.pipe(
            ofType(PublishersActions.loadPublisher),
            switchMap((params) => {
                return this.publishersService.GetPublisher(params.PGID).pipe(
                    map((result) => PublishersActions.loadPublisherSuccess({ Publisher: result })),
                    catchError(error => of(PublishersActions.loadPublisherError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    });

    loadPublishers = createEffect(() => {
        return this.actions.pipe(
            ofType(PublishersActions.loadPublishers),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap((params) => {
                return this.publishersService.GetPublishers(params[1].Skip, params[1].Take).pipe(
                    map((result) => PublishersActions.loadPublishersSuccess({ Publishers: result })),
                    catchError(error => of(PublishersActions.loadPublishersError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    });

    addPublisher = createEffect(() => {
        return this.actions.pipe(
            ofType(PublishersActions.addPublisher),
            switchMap((params) => {
                return this.publishersService.AddPublisher(params.Publisher).pipe(
                    map(() => PublishersActions.addPublisherSuccess()),
                    tap(() => this.router.navigate(["/publishers"])),
                    catchError(error => of(PublishersActions.addPublisherError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    updatePublisher = createEffect(() => {
        return this.actions.pipe(
            ofType(PublishersActions.updatePublisher),
            switchMap((params) => {
                return this.publishersService.UpdatePublisher(params.Publisher).pipe(
                    map(() => PublishersActions.updatePublisherSuccess()),
                    tap(() => this.router.navigate(["/publishers"])),
                    catchError(error => of(PublishersActions.updatePublisherError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    deletePublisher = createEffect(() => {
        return this.actions.pipe(
            ofType(PublishersActions.deletePublisher),
            switchMap((params) => {
                return this.publishersService.DeletePublisher(params.pgid).pipe(
                    map(() => PublishersActions.deletePublisherSuccess({ pgid: params.pgid })),
                    catchError(error => of(PublishersActions.deletePublisherError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });
}