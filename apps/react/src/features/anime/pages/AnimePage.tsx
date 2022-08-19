import { memo } from 'react';

import { Header } from '../../../components/Header';
import { AnimeList } from '../components/AnimeList';
import { Details } from '../components/Details';

import styles from './AnimePage.module.css';

const AnimePageComponent = () => (
  <>
    <Header />
    <div className={styles['content']}>
      <AnimeList />
      <Details />
    </div>
  </>
);

export const AnimePage = memo(AnimePageComponent);
