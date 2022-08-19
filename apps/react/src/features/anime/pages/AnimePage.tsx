import { memo } from 'react';

import { Header } from '../../../components/Header';
import { AnimeList } from '../components/AnimeList';

const AnimePageComponent = () => (
  <>
    <Header />
    <AnimeList/>
  </>
);

export const AnimePage = memo(AnimePageComponent);
