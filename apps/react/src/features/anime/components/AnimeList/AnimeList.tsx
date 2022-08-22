import { FC, memo, useEffect } from 'react';

import { fetchAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { selectAmineList, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';

import { Box, Divider, List, Typography } from '@mui/material';

import { AnimeItem } from '../AnimeItem/AnimeItem';

import styles from './AnimeList.module.css';

const AnimeListComponent: FC = () => {
  const animeList = useAppSelector(selectAmineList);
  const isLoading = useAppSelector(selectIsAnimeLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (animeList.length === 0) {
      dispatch(fetchAnimeList());
    }
  }, [dispatch, animeList]);

  if (isLoading) {
    return <span>Anime loading</span>;
  }

  return (
    <Box className={styles['animeCatalog']}>
      <Typography
        id="anime-list-catalog"
        component="h2"
        variant="body1"
        className={styles['animeCatalogTitle']}
      >
        Catalog
      </Typography>

      <List
        aria-labelledby="anime-list-catalog"
        className={styles['animeList']}
      >
        {animeList.map(anime => (<>
          <AnimeItem anime={anime} key={anime.id} />
          <Divider variant="inset" component="li" />
        </>))}
      </List>
    </Box>
  );
};

export const AnimeList = memo(AnimeListComponent);
