import { memo } from 'react';

import { Header } from '../../../components/Header';

const AnimePageComponent = () => (
  <>
    <Header />
    <div>AnimePageComponent</div>
  </>
);

export const AnimePage = memo(AnimePageComponent);
