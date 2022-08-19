import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { RestoreGuard } from '../../routes/guards/restoreGuard';
import { AuthGuardComponent } from '../../routes/guards/authGuard';

const GenresPage = lazy(() => import('./pages/GenresPage').then(module => ({ default: module.GenresPage })));

export const genresRoutes: RouteObject[] = [
  {
    element: <RestoreGuard ><AuthGuardComponent /></RestoreGuard>,
    children: [
      {
        path: '',
        element: <GenresPage />,
      },
      {
        path: '*',
        element: <Navigate to="GenresPage" />,
      },
    ],
  },

];
