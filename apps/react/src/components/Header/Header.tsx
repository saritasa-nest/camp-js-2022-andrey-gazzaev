import { FC, memo } from 'react';
import { Typography, Toolbar, Box, AppBar } from '@mui/material';

import { Dashboard } from './Dashboard';

import styles from './Header.module.css';

const HeaderComponent: FC = () => (
  <Box className={styles['header']}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="h1" className={styles['headerLogoText']}>
            Anime Catalog
        </Typography>
        <Dashboard />
      </Toolbar>
    </AppBar>
  </Box>
);

export const Header = memo(HeaderComponent);
