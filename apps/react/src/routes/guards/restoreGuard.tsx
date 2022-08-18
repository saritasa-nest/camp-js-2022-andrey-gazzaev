import { fetchUser } from '@js-camp/react/store/user/dispatchers';
import { selectAreUserLoading } from '@js-camp/react/store/user/selector';
import { memo, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';

import { AuthGuardComponent } from './authGuard';

const RestoreGuardComponent = () => {
  const dispatch = useAppDispatch();
  const isUserLoading = useAppSelector(selectAreUserLoading);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (isUserLoading ? <>Fetching user...</> : <AuthGuardComponent />);
};

export const RestoreGuard = memo(RestoreGuardComponent);
