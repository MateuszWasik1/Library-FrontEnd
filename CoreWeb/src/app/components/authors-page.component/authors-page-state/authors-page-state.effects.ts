import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import * as AuthorsActions from "./authors-page-state.actions"
import { Store } from "@ngrx/store";
import { AppState } from "../../../app.state";
import { APIErrorHandler } from "../../../error-handlers/api-error-handler";
import { Router } from "@angular/router";
import { selectFilters } from "./authors-page-state.selectors";
import { AuthorsService } from "../../../services/authors.service";

@Injectable()
export class AuthorsEffects {
    constructor(
        private actions: Actions,
        private router: Router,
        private authorsService: AuthorsService,
        public store: Store<AppState>,
        private errorHandler: APIErrorHandler) {
    }

    loadAuthor = createEffect(() => {
        return this.actions.pipe(
            ofType(AuthorsActions.loadAuthor),
            switchMap((params) => {
                return this.authorsService.GetAuthor(params.AGID).pipe(
                    map((result) => AuthorsActions.loadAuthorSuccess({ Author: result })),
                    catchError(error => of(AuthorsActions.loadAuthorError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    });

    loadAuthors = createEffect(() => {
        return this.actions.pipe(
            ofType(AuthorsActions.loadAuthors),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap((params) => {
                return this.authorsService.GetAuthors(params[1].Skip, params[1].Take).pipe(
                    map((result) => AuthorsActions.loadAuthorsSuccess({ Authors: result })),
                    catchError(error => of(AuthorsActions.loadAuthorsError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    });

    addAuthor = createEffect(() => {
        return this.actions.pipe(
            ofType(AuthorsActions.addAuthor),
            switchMap((params) => {
                return this.authorsService.AddAuthor(params.Author).pipe(
                    map(() => AuthorsActions.addAuthorSuccess()),
                    tap(() => this.router.navigate(["/authors"])),
                    catchError(error => of(AuthorsActions.addAuthorError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    updateAuthor = createEffect(() => {
        return this.actions.pipe(
            ofType(AuthorsActions.updateAuthor),
            switchMap((params) => {
                return this.authorsService.UpdateAuthor(params.Author).pipe(
                    map(() => AuthorsActions.updateAuthorSuccess()),
                    tap(() => this.router.navigate(["/authors"])),
                    catchError(error => of(AuthorsActions.updateAuthorError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    deleteAuthor = createEffect(() => {
        return this.actions.pipe(
            ofType(AuthorsActions.deleteAuthor),
            switchMap((params) => {
                return this.authorsService.DeleteAuthor(params.agid).pipe(
                    map(() => AuthorsActions.deleteAuthorSuccess({ agid: params.agid })),
                    catchError(error => of(AuthorsActions.deleteAuthorError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });
}