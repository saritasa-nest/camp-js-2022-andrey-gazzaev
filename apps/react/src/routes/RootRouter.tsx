import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { authRoutes } from '../features/auth/routes';
import { genresRoutes } from '../features/genres/routes';

import { RestoreUserGuard } from './guards';

const routes: RouteObject[] = [
  {
    element: <RestoreUserGuard />,
    children: [
      {
        path: '*',
        element: <Navigate to="/genre" />,
      },
      ...genresRoutes,
    ],
  },
  ...authRoutes,
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
