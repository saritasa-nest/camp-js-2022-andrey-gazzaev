import { memo, useEffect, FC } from 'react';
import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres, selectIsGenresLoading } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';

import { GenreCard } from '../../components/GenreCard';
import { Header } from '../../../../components/Header';

/** Genres page component. */
const GenresPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector(selectGenres);
  const isLoading = useAppSelector(selectIsGenresLoading);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Header />
      <h1>Genres</h1>
      {genres.map(genre => <GenreCard key={genre.id} genre={genre} />)}
    </>
  );
};

export const GenresPage = memo(GenresPageComponent);
