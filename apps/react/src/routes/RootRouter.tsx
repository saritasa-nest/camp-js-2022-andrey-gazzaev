import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { animeRoutes } from '../features/anime/routes';
import { authRoutes } from '../features/auth/routes';
import { genresRoutes } from '../features/genres/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/anime" />,
  },
  ...animeRoutes,
  ...genresRoutes,
  ...authRoutes,
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
