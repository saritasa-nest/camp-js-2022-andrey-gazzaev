import { FC, memo } from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import { clsx } from 'clsx';

import { AnimeBase } from '@js-camp/core/models/anime';

import styles from './AnimeItem.module.css';
import { Titles } from './Titles';
import { Information } from './Information';

interface Props {

  /** List of anime. */
  readonly anime: AnimeBase;

  /** Handles click on element. */
  readonly onClick: () => void;

  /** It is selected element. */
  readonly isSelected: boolean;
}

const AnimeItemComponent: FC<Props> = ({ anime, onClick, isSelected }) => {

  /** Handles click on anime item. */
  const handleClick = () => {
    onClick();
  };

  return (
    <ListItem
      className={clsx(
        styles.item,
        isSelected ? styles.itemSelected : null,
      )}
      disablePadding
      onClick={handleClick}
    >
      <ListItemAvatar
        className={styles.itemPoster}
      >
        <Avatar
          alt={`Anime poster - ${anime.imageTitle}`}
          src={anime.image}
          className={styles.poster}
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
};

export const AnimeItem = memo(AnimeItemComponent);
