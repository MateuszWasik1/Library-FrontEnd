import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as AccountActions from "./account-page-state.actions"
import { AccountsService } from "src/app/services/accounts.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";


@Injectable()
export class AccountEffects {
    constructor(
        private actions: Actions,
        private accountService: AccountsService,
        private cookieService: CookieService,
        private router: Router,
        private errorHandler: APIErrorHandler) {
    }
    
    RegisterUser = createEffect(() => {
        return this.actions.pipe(
            ofType(AccountActions.RegisterUser),
            switchMap((params) => {
                return this.accountService.Register(params.user).pipe(
                    map(() => AccountActions.RegisterUserSuccess()),
                    tap(() => this.router.navigate(['/login'])),
                    catchError(error => of(AccountActions.RegisterUserError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    Login = createEffect(() => {
        return this.actions.pipe(
            ofType(AccountActions.Login),
            switchMap((params) => {
                return this.accountService.Login(params.user).pipe(
                    map((result) => AccountActions.LoginSuccess({ token: result.toString() })),
                    tap(result => this.cookieService.set("token", result.token)),
                    tap(() => this.router.navigate(['/books'])),
                    catchError(error => of(AccountActions.LoginError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    })
}