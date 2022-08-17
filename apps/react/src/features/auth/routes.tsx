import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { LoginForm } from './components/LoginForm/LoginForm';

import { RegistrationForm } from './components/RegistrationForm/RegistrationForm';

const AuthPage = lazy(() => import('./pages/AuthPage')
  .then(module => ({ default: module.AuthPage })));

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: <AuthPage />,
    children: [
      {
        path: 'registration',
        element: <RegistrationForm />,
      },
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: '*',
        element: <Navigate to="/auth/login" />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="RegistrationPage" />,
  },
];
