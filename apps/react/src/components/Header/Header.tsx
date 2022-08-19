import { FC, memo } from 'react';
import { Button, Typography, Toolbar, Box, AppBar } from '@mui/material';

import { selectUser } from '@js-camp/react/store/user/selector';
import { logoutUser } from '@js-camp/react/store/user/dispatchers';

import { useAppDispatch, useAppSelector } from '../../store';

const HeaderComponent: FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleUserLogout = () => {
    dispatch(logoutUser());
  };

  if (user === null) {
    return <p>Oops, something went wrong.</p>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Anime Catalog
          </Typography>

          <Box>
            <Typography variant="h6" component="span">
              Hello {user.firstName} {user.lastName}
            </Typography>

            <Button
              type="button"
              color="inherit"
              onClick={handleUserLogout}
            >
              Log Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export const Header = memo(HeaderComponent);
