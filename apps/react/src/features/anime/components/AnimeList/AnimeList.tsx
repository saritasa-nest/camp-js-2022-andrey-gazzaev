import { FC, memo, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, debounce, Divider, List, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { fetchAnimeList, fetchNextAnimeList, removeAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { selectAmineList, selectAreAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { AnimeListQueryParams } from '@js-camp/core/models/anime-list-query-params';
import { AnimeSortDirection, AnimeSortField, AnimeType } from '@js-camp/core/models/anime';

import { FilterBar } from '../FilterBar';
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
  const [searchParams, setSearchParams] = useSearchParams();

  const getAnimeListOptions = (): AnimeListQueryParams => {
    const page = searchParams.get('page') !== null ? Number(searchParams.get('page')) : INITIAL_PARAMS.page;
    const pageSize = searchParams.get('pageSize') !== null ?
      Number(searchParams.get('pageSize')) :
      INITIAL_PARAMS.pageSize;
    const typesUrl = searchParams.get('types');
    const types = typesUrl !== null ?
      typesUrl.split(',') as AnimeType[] :
      INITIAL_PARAMS.types;

    return {
      page,
      pageSize,
      search: searchParams.get('search') ?? INITIAL_PARAMS.search,
      types,
      sort: {
        field: searchParams.get('field') as AnimeSortField ?? INITIAL_PARAMS.sort.field,
        direction: searchParams.get('direction') as AnimeSortDirection ?? INITIAL_PARAMS.sort.direction,
      },
    };
  };

  const [query, setQuery] = useState<AnimeListQueryParams>(getAnimeListOptions());

  const setQueryParamsToUrl = ({ search, types }: AnimeListQueryParams) => {
    const queryParamsForUrl = { search, types: types.toString() };
    const params = new URLSearchParams(queryParamsForUrl);
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    if (animeList.length > 0) {
      setQueryParamsToUrl(query);
      dispatch(removeAnimeList());
    }
  }, [query]);

  useEffect(() => {
    if (animeList.length === 0) {
      dispatch(fetchAnimeList(query));
    }
  }, [animeList]);

  const getMoreAnime = () => {
    dispatch(fetchNextAnimeList());
  };

  const handleSearchChange = (search: string) => {
    setQuery({ ...query, search });
  };

  const handleFiltersChange = (filters: readonly AnimeType[]) => {
    setQuery({ ...query, types: filters });
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

      <Box className={styles['anime-catalog__query-bar']}>
        <SearchBar onChange={debounce(handleSearchChange, 500)} initialValue={query.search} />
        <FilterBar onChange={debounce(handleFiltersChange, 500)} initialValue={query.types} />
      </Box>

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
