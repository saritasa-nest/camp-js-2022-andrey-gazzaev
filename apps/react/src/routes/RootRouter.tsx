import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { animeRoutes } from '../features/anime/routes';
import { authRoutes } from '../features/auth/routes';
import { editorRoutes } from '../features/editor/routes';
import { genresRoutes } from '../features/genres/routes';

import { RestoreUserGuard } from './guards';

const routes: RouteObject[] = [
  {
    element: <RestoreUserGuard />,
    children: [
      {
        path: '*',
        element: <Navigate to="/anime" />,
      },
      ...genresRoutes,
      ...animeRoutes,
      ...editorRoutes,
    ],
  },
  ...authRoutes,
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
