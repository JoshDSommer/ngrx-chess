import { createAction, props } from '@ngrx/store';
import { User } from '@supabase/supabase-js';

export const init = createAction('[User Page] Init');

export const loadUserSuccess = createAction(
  '[User/API] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[User/API] Load User Failure',
  props<{ error: any }>()
);
export const magicLinkAuthentication = createAction(
  '[Auth] User Authentication via Magic Link'
);

export const magicLinkAuthenticationError = createAction(
  '[Auth] User Authentication Error via Magic Link'
);
export const magicLinkAuthenticationNoSession = createAction(
  '[Auth] User Authentication Error via Magic Link no session'
);

export const magicLinkAuthenticationSuccess = createAction(
  '[Auth] User Authenticated via Magic Link'
);

export const userNotAuthenticated = createAction(
  '[Auth] User Not Authenticated '
);

export const userAuthenticated = createAction('[Auth] User Authenticated ');
