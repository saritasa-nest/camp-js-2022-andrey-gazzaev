import { FC, memo } from 'react';
import { Typography, Toolbar, Box, AppBar } from '@mui/material';

import { Dashboard } from './Dashboard';

const HeaderComponent: FC = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Anime Catalog
        </Typography>
        <Dashboard />
      </Toolbar>
    </AppBar>
  </Box>
);

export const Header = memo(HeaderComponent);
