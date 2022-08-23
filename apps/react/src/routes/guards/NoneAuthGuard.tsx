import { FC, memo } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';

import { selectUser } from '@js-camp/react/store/user/selector';

import { useAppSelector } from '../../store';

const NoneAuthGuardComponent: FC = () => {
  const user = useAppSelector(selectUser);

  const redirect: To = {
    pathname: '/',
  };

  return user !== null ? <Navigate to={redirect} replace /> : <Outlet />;
};

export const NoneAuthGuard = memo(NoneAuthGuardComponent);
