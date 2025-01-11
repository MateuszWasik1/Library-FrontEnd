import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import * as BooksActions from "./books-page-state.actions"
import { Store } from "@ngrx/store";
import { AppState } from "../../../app.state";
import { APIErrorHandler } from "../../../error-handlers/api-error-handler";
import { Router } from "@angular/router";
import { BooksService } from "../../../services/books.service";
import { selectFilters } from "./books-page-state.selectors";
import { AuthorsService } from "src/app/services/authors.service";

@Injectable()
export class BooksEffects {
    constructor(
        private actions: Actions,
        private router: Router,
        private booksService: BooksService,
        private authorsService: AuthorsService,
        public store: Store<AppState>,
        private errorHandler: APIErrorHandler) {
    }

    loadBook = createEffect(() => {
        return this.actions.pipe(
            ofType(BooksActions.loadBook),
            switchMap((params) => {
                return this.booksService.GetBook(params.BGID).pipe(
                    map((result) => BooksActions.loadBookSuccess({ Book: result })),
                    catchError(error => of(BooksActions.loadBookError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    });

    loadBooks = createEffect(() => {
        return this.actions.pipe(
            ofType(BooksActions.loadBooks),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap((params) => {
                return this.booksService.GetBooks(params[1].Skip, params[1].Take).pipe(
                    map((result) => BooksActions.loadBooksSuccess({ Books: result })),
                    catchError(error => of(BooksActions.loadBooksError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    });

    loadAuthors = createEffect(() => {
        return this.actions.pipe(
            ofType(BooksActions.loadAuthors),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap(() => {
                return this.authorsService.GetAuthors(0, 999).pipe(
                    map((result) => BooksActions.loadAuthorsSuccess({ Authors: result })),
                    catchError(error => of(BooksActions.loadAuthorsError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    });

    addBook = createEffect(() => {
        return this.actions.pipe(
            ofType(BooksActions.addBook),
            switchMap((params) => {
                return this.booksService.AddBook(params.Book).pipe(
                    map(() => BooksActions.addBookSuccess()),
                    tap(() => this.router.navigate(["/books"])),
                    catchError(error => of(BooksActions.addBookError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    updateBook = createEffect(() => {
        return this.actions.pipe(
            ofType(BooksActions.updateBook),
            switchMap((params) => {
                return this.booksService.UpdateBook(params.Book).pipe(
                    map(() => BooksActions.updateBookSuccess()),
                    tap(() => this.router.navigate(["/books"])),
                    catchError(error => of(BooksActions.updateBookError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    deleteBook = createEffect(() => {
        return this.actions.pipe(
            ofType(BooksActions.deleteBook),
            switchMap((params) => {
                return this.booksService.DeleteBook(params.bgid).pipe(
                    map(() => BooksActions.deleteBookSuccess({ bgid: params.bgid })),
                    catchError(error => of(BooksActions.deleteBookError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });
}