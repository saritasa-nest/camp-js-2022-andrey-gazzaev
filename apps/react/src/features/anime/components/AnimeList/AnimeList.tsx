import { FC, memo, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, debounce, Divider, List, Typography } from '@mui/material';

import { fetchAnimeList, fetchNextAnimeList, removeAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { selectAmineList, selectAreAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { AnimeListQueryParams } from '@js-camp/core/models/anime-list-query-params';
import { AnimeSortDirection, AnimeSortField, AnimeType } from '@js-camp/core/models/anime';

import { SearchBar } from '../SearchBar';
import { AnimeItem } from '../AnimeItem/AnimeItem';

import styles from './AnimeList.module.css';

const INITIAL_PARAMS: AnimeListQueryParams = {
  page: 0,
  pageSize: 25,
  search: '',
  types: [AnimeType.Tv],
  sort: {
    field: AnimeSortField.TitleJapanese,
    direction: AnimeSortDirection.Ascending,
  },
};

const AnimeListComponent: FC = () => {
  const animeList = useAppSelector(selectAmineList);
  const isLoading = useAppSelector(selectAreAnimeLoading);
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState<AnimeListQueryParams>(INITIAL_PARAMS);
  useEffect(() => {
    dispatch(removeAnimeList());
  }, [query]);

  useEffect(() => {
    if (animeList.length === 0) {
      dispatch(fetchAnimeList(query));
    }
  }, [dispatch, animeList]);

  const getMoreAnime = () => {
    dispatch(fetchNextAnimeList());
  };

  const handlerSearchChange = (search: string) => {
    setQuery({ ...query, search });
  };

  return (
    <Box className={styles['anime-catalog']}>
      <Typography
        component="h2"
        variant="body1"
        className={styles['anime-catalog__title']}
      >
        Anime catalog
      </Typography>

      <SearchBar onChange={debounce(handlerSearchChange, 500)} />

      {
        !isLoading ?
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
          </List> :
          <span>Anime loading</span>
      }
    </Box>
  );
};

export const AnimeList = memo(AnimeListComponent);
