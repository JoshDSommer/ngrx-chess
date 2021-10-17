export const appRoutes = [
  {
    path: 'game',
    loadChildren: () =>
      import('../../../../libs/game/src/lib/game.module').then(
        (m) => m.GameModule
      ),
  },
];
