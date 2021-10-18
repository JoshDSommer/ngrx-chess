import { Routes } from '@angular/router';

export const appRoutes = [
  {
    path: 'game',
    loadChildren: () =>
      import('../../../../libs/game/src/lib/game.module').then(
        (m) => m.GameModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../../../../libs/login/src/lib/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'logout',
    redirectTo: 'login',
  },
] as Routes;
