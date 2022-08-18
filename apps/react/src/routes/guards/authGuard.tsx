
import { Navigate, Outlet, To } from 'react-router-dom';

import { selectUser } from '@js-camp/react/store/user/selector';

import { useAppSelector } from '../../store';

export const AuthGuard = () => {
  const user = useAppSelector(selectUser);

  const redirect: To = {
    pathname: '/auth/login',
  };

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
