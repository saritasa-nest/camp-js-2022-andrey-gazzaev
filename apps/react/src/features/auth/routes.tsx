import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const RegistrationPage = lazy(() => import('./pages/RegistrationPage')
  .then(module => ({ default: module.RegistrationPage })));

export const authRoutes: RouteObject[] = [
  {
    path: 'auth/registration',
    element: <RegistrationPage />,
  },
  {
    path: '*',
    element: <Navigate to="RegistrationPage" />,
  },
];
