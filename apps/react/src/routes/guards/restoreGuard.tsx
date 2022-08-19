import { fetchUser } from '@js-camp/react/store/user/dispatchers';
import { selectAreUserLoading, selectUser } from '@js-camp/react/store/user/selector';
import { memo, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';

import { AuthGuardComponent } from './authGuard';

const RestoreGuardComponent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isUserLoading = useAppSelector(selectAreUserLoading);

  useEffect(() => {
    if (user === null) {
      dispatch(fetchUser());
    }
  }, [user]);

  return (isUserLoading ? <>Fetching user...</> : <AuthGuardComponent />);
};

export const RestoreGuard = memo(RestoreGuardComponent);
