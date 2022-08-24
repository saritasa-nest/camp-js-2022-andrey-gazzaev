import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { AuthGuard } from '../../routes/guards';

const EditorPage = lazy(() => import('./pages/EditorPage').then(module => ({ default: module.EditorPage })));

export const editorRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: 'editor',
        element: <EditorPage />,
      },
      {
        path: 'editor/:id',
        element: <EditorPage />,
      },
      {
        path: '*',
        element: <Navigate to="EditorPage" />,
      },
    ],
  },
];
