import { useSearchParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce, Divider, List, Paper, Typography } from '@mui/material';
import { FC, Fragment, memo, useCallback, useEffect, useState } from 'react';

import { removeAnimeList } from '@js-camp/react/store/anime/slice';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { AnimeListQueryParamsWithId } from '@js-camp/core/models/anime-list-query-params';
import { AnimeSortDirection, AnimeSortField, AnimeType } from '@js-camp/core/models/anime';
import { fetchAnimeList, fetchNextAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { selectAmineList, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';

import { QueryBar } from '../QueryBar/QueryBar';
import { AnimeItem } from '../AnimeItem/AnimeItem';

import styles from './AnimeList.module.css';

interface Props {

  /** Anime list component class name. */
  readonly className: string;
}
const INITIAL_PARAMS: AnimeListQueryParamsWithId = {
  page: 0,
  pageSize: 25,
  search: '',
  types: [AnimeType.Tv],
  sort: {
    field: AnimeSortField.TitleEnglish,
    direction: AnimeSortDirection.Ascending,
  },
  id: -1,
};

/**
 * Gets anime list option from url.
 * @param searchParams Params into url.
 */
const getAnimeListOptions = (searchParams: URLSearchParams): AnimeListQueryParamsWithId => {
  const page = searchParams.get('page') !== null ? Number(searchParams.get('page')) : INITIAL_PARAMS.page;
  const pageSize = searchParams.get('pageSize') !== null ?
    Number(searchParams.get('pageSize')) :
    INITIAL_PARAMS.pageSize;
  const typesUrl = searchParams.get('types');
  const types = typesUrl !== null ?
    typesUrl.split(',') as AnimeType[] :
    INITIAL_PARAMS.types;
  const id = searchParams.get('id') !== null ? Number(searchParams.get('id')) : INITIAL_PARAMS.id;

  return {
    page,
    pageSize,
    search: searchParams.get('search') ?? INITIAL_PARAMS.search,
    types,
    sort: {
      field: searchParams.get('field') as AnimeSortField ?? INITIAL_PARAMS.sort.field,
      direction: searchParams.get('direction') as AnimeSortDirection ?? INITIAL_PARAMS.sort.direction,
    },
    id,
  };
};

const AnimeListComponent: FC<Props> = () => {
  const animeList = useAppSelector(selectAmineList);
  const isLoading = useAppSelector(selectIsAnimeLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<AnimeListQueryParamsWithId>(getAnimeListOptions(searchParams));
  const [currentAnimeId, setCurrentAnimeId] = useState(query.id);
  const dispatch = useAppDispatch();

  /**
   * Sets query params to url.
   * @param animeListQueryParams Query params.
   * @param animeId Anime id.
   */
  const setQueryParamsToUrl = ({ search, types, sort, id }: AnimeListQueryParamsWithId) => {
    const queryParamsForUrl = {
      search,
      types: types.toString(),
      field: sort.field,
      direction: sort.direction,
      id: String(id),
    };

    const params = new URLSearchParams(queryParamsForUrl);
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    if (animeList.length > 0) {
      setQueryParamsToUrl({ ...query, id: currentAnimeId });
      dispatch(removeAnimeList());
    }
  }, [query]);

  useEffect(() => {
    if (animeList.length === 0) {
      dispatch(fetchAnimeList(query));
    }
  }, [animeList]);

  /** Gets more anime. */
  const getMoreAnime = useCallback(() => {
    dispatch(fetchNextAnimeList());
  }, []);

  /**
   * Handles anime select.
   * @param id Anime ID.
   */
  const handleAnimeSelect = useCallback((id: number) => {
    setQueryParamsToUrl({ ...query, id });
    setCurrentAnimeId(id);
  }, [query]);

  return (
    <Paper className={styles.animeCatalog}>
      <Typography
        component="h2"
        variant="body1"
        className={styles.animeCatalogTitle}
      >
        Anime catalog
      </Typography>

      <QueryBar
        initialQuery={query}
        onQueryParamsChange={debounce(setQuery, 500)}
      />

      {
        !isLoading ?
          <List
            id="scrollableDiv"
            aria-labelledby="anime-list-catalog"
            className={styles.animeList}
          >
            <InfiniteScroll
              dataLength={animeList.length}
              next={getMoreAnime}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >

              {animeList.map(anime => (
                <Fragment key={anime.id}>
                  <AnimeItem
                    anime={anime}
                    onClick={() => handleAnimeSelect(anime.id)}
                    isSelected={currentAnimeId === anime.id}
                  />
                  <Divider variant="inset" component="li" />
                </Fragment >
              ))}

            </InfiniteScroll>
          </List> :
          <span>No anime</span>
      }
    </Paper>
  );
};

export const AnimeList = memo(AnimeListComponent);