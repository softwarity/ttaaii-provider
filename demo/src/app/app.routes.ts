import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        outlet: 'playground',
        loadComponent: () =>
          import('./playground/playground.component').then((m) => m.PlaygroundComponent),
      },
    ],
  },
];
