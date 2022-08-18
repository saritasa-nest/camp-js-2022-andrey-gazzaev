import { memo } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';

import { selectUser } from '@js-camp/react/store/user/selector';

import { useAppSelector } from '../../store';

export const AuthGuardComponent = () => {
  const user = useAppSelector(selectUser);

  const redirect: To = {
    pathname: '/auth/login',
  };

  return user === null ? <Navigate to={redirect} replace /> : <Outlet />;
};

export const AuthGuard = memo(AuthGuardComponent);
