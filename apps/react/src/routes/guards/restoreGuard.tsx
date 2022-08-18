import { fetchUser } from '@js-camp/react/store/user/dispatchers';
import { selectAreUserLoading, selectUser } from '@js-camp/react/store/user/selector';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';

import { AuthGuard } from './authGuard';

export const RestoreGuard = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isUserLoading = useAppSelector(selectAreUserLoading);
  const [isUserFetch, setIsUserFetch] = useState(true);

  useEffect(() => {
    setIsUserFetch(false);
  }, [isUserLoading]);

  useEffect(() => {
    if (user === null) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  return (isUserLoading || isUserFetch ? <>Fetching user...</> : <AuthGuard />);
};
