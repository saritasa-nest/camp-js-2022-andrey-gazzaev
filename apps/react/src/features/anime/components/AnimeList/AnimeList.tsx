import { FC, memo, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchAnimeList, fetchNextAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { selectAmineList, selectAreAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';

import { Box, Divider, List, Typography } from '@mui/material';

import { AnimeItem } from '../AnimeItem/AnimeItem';

import styles from './AnimeList.module.css';

const AnimeListComponent: FC = () => {
  const animeList = useAppSelector(selectAmineList);
  const isLoading = useAppSelector(selectAreAnimeLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (animeList.length === 0) {
      dispatch(fetchAnimeList());
    }
  }, [dispatch, animeList]);

  const getMoreAnime = () => {
    dispatch(fetchNextAnimeList());
  };

  if (isLoading) {
    return <span>Anime loading</span>;
  }

  return (
    <Box className={styles['anime-catalog']}>
      <Typography
        component="h2"
        variant="body1"
        className={styles['anime-catalog__title']}
      >
        Anime catalog
      </Typography>
      <List
        id="scrollableDiv"
        className={styles['anime-list']}
        aria-labelledby="anime-list-catalog"
        sx={{
          bgcolor: 'background.paper',
        }}
      >
        <InfiniteScroll
          className={styles['anime-list']}
          dataLength={animeList.length}
          next={getMoreAnime}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget="scrollableDiv"
        >

          {animeList.map(anime => (<>
            <AnimeItem anime={anime} key={anime.id} />
            <Divider variant="inset" component="li" />
          </>))}

        </InfiniteScroll>
      </List>
    </Box>
  );
};

export const AnimeList = memo(AnimeListComponent);
