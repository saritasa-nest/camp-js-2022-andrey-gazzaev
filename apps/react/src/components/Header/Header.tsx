import { memo } from 'react';
import { Button, Typography, Toolbar, Box, AppBar } from '@mui/material';

import { selectUser } from '@js-camp/react/store/user/selector';

import { useAppSelector } from '../../store';

const HeaderComponent = () => {
  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Anime Catalog
          </Typography>

          <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
            Hello {user.firstName} {user.lastName}
          </Typography>

          <Button color="inherit">Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export const Header = memo(HeaderComponent);
