/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  redirectToUrl,
  SupabaseLoginService,
  urlDoesNotContain,
} from '@ngrx-chess/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import {
  userAuthenticated,
  userNotAuthenticated,
} from 'libs/shared/src/lib/+state/user.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class AppEffects {
  authentication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      urlDoesNotContain('#access_token='),
      urlDoesNotContain('#error_code='),
      urlDoesNotContain('login'),
      map(() => {
        const sessionExists = this.login.getSession();
        if (sessionExists) {
          return userAuthenticated();
        }
        return userNotAuthenticated();
      })
    )
  );

  errorRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userNotAuthenticated),
        redirectToUrl(this.router, '/login')
      ),
    { dispatch: false }
  );

  successRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userAuthenticated),
        redirectToUrl(this.router, '/game')
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private router: Router,
    private login: SupabaseLoginService
  ) {}
}
