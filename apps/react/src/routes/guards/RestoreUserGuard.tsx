import { FC, memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { fetchedUser } from '@js-camp/react/store/user/dispatchers';
import { selectIsUserLoading, selectUser } from '@js-camp/react/store/user/selector';

import { useAppDispatch, useAppSelector } from '../../store';

const RestoreUserGuardComponent: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isUserLoading = useAppSelector(selectIsUserLoading);

  useEffect(() => {
    if (user === null) {
      dispatch(fetchedUser());
    }
  }, [user]);

  return (isUserLoading ? <>Fetching user...</> : <Outlet />);
};

export const RestoreUserGuard = memo(RestoreUserGuardComponent);
