import { FC, memo } from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import { AnimeBase } from '@js-camp/core/models/anime';

import styles from './AnimeItem.module.css';
import { Titles } from './Titles';
import { Information } from './Information';

interface Props {

  /** List of anime. */
  readonly anime: AnimeBase;
}

const AnimeItemComponent: FC<Props> = ({ anime }) => (
  <ListItem
    disablePadding
  >
    <ListItemAvatar
      className={styles.itemPoster}
    >
      <Avatar
        alt={`Anime poster - ${anime.imageTitle}`}
        src={anime.image}
        className={styles['poster']}
      />
    </ListItemAvatar>
    <ListItemText
      primary={
        <Titles
          titleEnglish={anime.titleEnglish}
          titleJapanese={anime.titleJapanese}
        />
      }
      secondary={
        <Information
          status={anime.status}
          type={anime.type}
        />
      }
    />
  </ListItem>
);

export const AnimeItem = memo(AnimeItemComponent);
