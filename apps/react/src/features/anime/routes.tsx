import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { AuthGuard, RestoreGuard } from '../../routes/guards';

const AnimePage = lazy(() => import('./pages/AnimePage').then(module => ({ default: module.AnimePage })));

export const animeRoutes: RouteObject[] = [
  {
    element: <RestoreGuard ><AuthGuard /></RestoreGuard>,
    children: [
      {
        path: 'anime',
        element: <AnimePage />,
      },
      {
        path: '*',
        element: <Navigate to="AnimePage" />,
      },
    ],
  },
];
