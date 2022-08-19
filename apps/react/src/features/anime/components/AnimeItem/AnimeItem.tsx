import React, { memo } from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

import { AnimeBase } from '@js-camp/core/models/anime';

import { replaceNull } from '../../../auth/utils/text';

import styles from './AnimeItem.module.css';

interface Props {

  /** List of anime. */
  readonly anime: AnimeBase;
}

const AnimeItemComponent = ({ anime }: Props) => (
  <ListItem
    disablePadding
    className={styles['item']}
  >
    <ListItemAvatar
      className={styles['item__poster']}
    >
      <Avatar
        alt={`Anime poster - ${anime.imageTitle}`}
        src={anime.image}
        className={styles['poster']}
      />
    </ListItemAvatar>
    <ListItemText
      primary={
        <React.Fragment>
          <Typography
            component="p"
            variant="subtitle1"
            color="text.primary"
          >
            {replaceNull(anime.titleEnglish)}
          </Typography>
          <Typography
            component="p"
            variant="subtitle2"
            color="text.primary"
          >
            {replaceNull(anime.titleJapanese)}
          </Typography>
        </React.Fragment>
      }
      secondary={
        <React.Fragment>
          <Typography
            component="p"
            variant="body2"
            color="text.primary"
          >
            Type: {replaceNull(anime.type)}
          </Typography>
          <Typography
            component="p"
            variant="body2"
            color="text.primary"
          >
            Status: {replaceNull(anime.status)}
          </Typography>
        </React.Fragment>
      }
    />
  </ListItem>
);

export const AnimeItem = memo(AnimeItemComponent);
