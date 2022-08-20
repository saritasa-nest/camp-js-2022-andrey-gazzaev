import { FC, memo, ReactNode, useEffect } from 'react';

import { fetchUser } from '@js-camp/react/store/user/dispatchers';
import { selectAreUserLoading, selectUser } from '@js-camp/react/store/user/selector';

import { useAppDispatch, useAppSelector } from '../../store';

interface Props {

  /** Children of element.*/
  readonly children: ReactNode;
}

const RestoreGuardComponent: FC<Props> = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isUserLoading = useAppSelector(selectAreUserLoading);

  useEffect(() => {
    if (user === null) {
      dispatch(fetchUser());
    }
  }, [user]);

  return (isUserLoading ? <>Fetching user...</> : <>{children}</>);
};

export const RestoreGuard = memo(RestoreGuardComponent);
