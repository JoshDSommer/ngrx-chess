import { Action, createReducer, on } from '@ngrx/store';
import { User } from '@supabase/supabase-js';
import * as UserActions from './user.actions';
export const USER_FEATURE_KEY = 'user';

export interface State {
  loaded: boolean; // has the User list been loaded
  error?: string | null; // last known error (if any)
  user: User | null;
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: State;
}

export const initialState: State = {
  // set initial required properties
  loaded: false,
  user: null,
};

const userReducer = createReducer(
  initialState,
  on(UserActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(UserActions.loadUserSuccess, (state, { user }) => {
    return { ...state, user, loaded: true };
  }),
  on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
