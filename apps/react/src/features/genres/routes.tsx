import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { AuthGuardComponent } from '../../routes/guards/AuthGuard';

const GenresPage = lazy(() => import('./pages/GenresPage').then(module => ({ default: module.GenresPage })));

export const genresRoutes: RouteObject[] = [
  {
    element: <AuthGuardComponent />,
    children: [
      {
        path: 'genre',
        element: <GenresPage />,
      },
      {
        path: '*',
        element: <Navigate to="GenresPage" />,
      },
    ],
  },

];
