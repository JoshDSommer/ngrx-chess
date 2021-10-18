import { createAction } from '@ngrx/store';

export const applicationStartWithSessionData = createAction(
  '[Auth] Application start with existing User session'
);
export const applicationStartWithOutSessionData = createAction(
  '[Auth] Application start without existing User session'
);
