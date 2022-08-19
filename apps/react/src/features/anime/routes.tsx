import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { RestoreGuard } from '../../routes/guards/restoreGuard';
import { AuthGuardComponent } from '../../routes/guards/authGuard';

const AnimePage = lazy(() => import('./pages/AnimePage').then(module => ({ default: module.AnimePage })));

export const animeRoutes: RouteObject[] = [
  {
    element: <RestoreGuard ><AuthGuardComponent /></RestoreGuard>,
    children: [
      {
        path: '',
        element: <AnimePage />,
      },
      {
        path: '*',
        element: <Navigate to="AnimePage" />,
      },
    ],
  },
];
