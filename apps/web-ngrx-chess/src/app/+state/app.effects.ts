/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  redirectToUrl,
  SupabaseLoginService,
  urlContains,
  urlDoesNotContain,
} from '@ngrx-chess/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import {
  userAuthenticated,
  userNotAuthenticated,
} from 'libs/shared/src/lib/+state/user.actions';
import { from } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AppEffects {
  authentication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      urlDoesNotContain('#access_token='),
      urlDoesNotContain('#error_code='),
      urlDoesNotContain('login'),
      urlDoesNotContain('logout'),
      delay(300), //delay of 300 so that session is available on supabase service when logging in.
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
  logoutRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        urlContains('logout'),
        switchMap(() => from(this.login.signOut()))
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private router: Router,
    private login: SupabaseLoginService
  ) {}
}
