import { memo } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';

import { selectUser } from '@js-camp/react/store/user/selector';

import { useAppSelector } from '../../store';

const noneAuthGuardComponent = () => {
  const user = useAppSelector(selectUser);

  const redirect: To = {
    pathname: '/',
  };

  if (user !== null) {
    return < Navigate to={redirect} replace />;
  }

  return (
    <Outlet />
  );
};

export const NoneAuthGuard = memo(noneAuthGuardComponent);
