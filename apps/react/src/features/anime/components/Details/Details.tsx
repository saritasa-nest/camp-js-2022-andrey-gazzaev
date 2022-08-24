import moment from 'moment';
import YouTube from 'react-youtube';

import { Container } from '@mui/system';
import { useLocation } from 'react-router-dom';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Chip, Divider, List, ListItem, Typography } from '@mui/material';

import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { selectStudios } from '@js-camp/react/store/studio/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { fetchAnimeDetailsById } from '@js-camp/react/store/animeDetails/dispatchers';
import { selectAnimeDetailsById } from '@js-camp/react/store/animeDetails/selectors';

import { replaceNull } from '../../../auth/utils/text';

import { ImagePopup } from '../ImagePopup/ImagePopup';

import styles from './Details.module.css';

const INITIAL_ID = -1;

/**
 * Gets anime ID.
 * @param searchParams Params into URL.
 */
const getAnimeId = (searchParams: URLSearchParams): number => searchParams.get('id') !== null ?
  Number(searchParams.get('id')) :
  INITIAL_ID;

const DetailsComponent: FC = () => {
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const { search } = useLocation();
  const [currentAnimeId, setCurrentAnimeId] = useState(getAnimeId(new URLSearchParams(search)));
  const genres = useAppSelector(selectGenres);
  const studios = useAppSelector(selectStudios);
  const animeDetails = useAppSelector(state => selectAnimeDetailsById(state, currentAnimeId));
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrentAnimeId(getAnimeId(new URLSearchParams(search)));
  }, [search]);

  useEffect(() => {
    if (animeDetails === undefined) {
      dispatch(fetchAnimeDetailsById(currentAnimeId));
    }
  }, [animeDetails, currentAnimeId]);

  /** Handles image popup open. */
  const handleImagePopupOpen = useCallback(() => {
    setIsImagePopupOpen(true);
  }, []);

  /** Handles image popup close. */
  const handleImagePopupClose = useCallback(() => {
    setIsImagePopupOpen(false);
  }, []);

  return (
    <Container>
      <Box>
        {
          animeDetails === undefined ?
            <Typography component="h2" variant="h4">
              Please select an anime
            </Typography> :
            <Card >
              <CardHeader
                title={
                  <Typography component="h2" variant="h5">
                    {replaceNull(animeDetails.titleEnglish)}
                  </Typography>
                }
                subheader={
                  <Typography variant="subtitle1">
                    {replaceNull(animeDetails.titleJapanese)}
                  </Typography>
                }
              />

              <Box className={styles.cardContent}>
                <Box className={styles.cardMedia}>

                  <Button
                    className={styles.posterButton}
                    onClick={handleImagePopupOpen}
                  >
                    <img
                      className={styles.poster}
                      src={animeDetails.image}
                      alt={`Poster anime - ${animeDetails.imageTitle}`}
                    />
                  </Button>

                  <ImagePopup
                    imageSrc={animeDetails.image}
                    onClose={handleImagePopupClose}
                    isOpen={isImagePopupOpen}
                  />

                  {animeDetails.trailerYoutubeId && <YouTube
                    className={styles.cardTrailer}
                    iframeClassName={styles.trailer}
                    videoId={animeDetails.trailerYoutubeId} />
                  }
                </Box>

                <CardContent>
                  <Typography variant="body2">
                    {animeDetails.synopsis}
                  </Typography>

                  <Typography variant="body2">
                    {`Aired from
                      ${moment(animeDetails.aired.start).format('MM.DD.YYYY')} to
                      ${moment(animeDetails.aired.end).format('MM.DD.YYYY')}`}
                  </Typography>

                  <Typography variant="body2">
                    Airing: {animeDetails.isAiring ? 'Yes' : 'No'}
                  </Typography>

                  <Box>
                    <Typography variant="overline">
                      Genres
                    </Typography>

                    <Divider variant="middle" />
                    <List className={styles.list}>
                      {animeDetails.genres.map(id => (
                        <ListItem key={id} className={styles.listItem}>
                          <Chip label={genres.find((genre => genre.id === id))?.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Box>
                    <Typography variant="overline">
                      Studios
                    </Typography>
                    <Divider variant="middle" />
                    <List>
                      {animeDetails.studios.map(id => (
                        <ListItem key={id} className={styles.listItem}>
                          <Chip label={studios.find((studio => studio.id === id))?.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </CardContent>
              </Box>
            </Card>
        }
      </Box>
    </Container>
  );
};

export const Details = memo(DetailsComponent);
