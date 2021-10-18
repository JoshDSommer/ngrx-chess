import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { map } from 'rxjs/operators';
import { redirectToUrl, urlContains } from '../functions/state';
import { SupabaseLoginService } from '../supabase-login.service';
import {
  loadUserSuccess,
  magicLinkAuthenticationError,
  magicLinkAuthenticationSuccess,
  userAuthenticated,
} from './user.actions';

@Injectable()
export class UserEffects {
  magicLinkAuthentication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      urlContains('#access_token='),
      map(() => {
        const sessionExists = this.login.getSession();
        if (sessionExists) {
          return magicLinkAuthenticationSuccess();
        }
        return magicLinkAuthenticationError();
      })
    )
  );

  magicLinkAuthenticationError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      urlContains('#error_code=404'),
      map(() => magicLinkAuthenticationError())
    )
  );

  errorRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(magicLinkAuthenticationError),
        redirectToUrl(this.router, '/login/error')
      ),
    { dispatch: false }
  );

  successRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(magicLinkAuthenticationSuccess),
        redirectToUrl(this.router, '/game')
      ),
    { dispatch: false }
  );

  refreshUserData = createEffect(() =>
    this.actions$.pipe(
      ofType(userAuthenticated, magicLinkAuthenticationSuccess),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      map(() => loadUserSuccess({ user: this.login.getUser()! }))
    )
  );

  constructor(
    private readonly actions$: Actions,
    private router: Router,
    private login: SupabaseLoginService
  ) {}
}
