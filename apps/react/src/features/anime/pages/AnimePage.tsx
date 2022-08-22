import { Box } from '@mui/material';
import { FC, memo } from 'react';

import { Header } from '../../../components/Header';
import { AnimeList } from '../components/AnimeList';
import { Details } from '../components/Details';

import styles from './AnimePage.module.css';

const AnimePageComponent: FC = () => (
  <>
    <Header />
    <Box className={styles['content']}>
      <AnimeList className={styles['content__anime-catalog']} />
      <Details />
    </Box>
  </>
);

export const AnimePage = memo(AnimePageComponent);
