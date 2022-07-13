import { Anime } from '@js-camp/core/models/anime';
import { DateRange } from '@js-camp/core/models/dateRange';
import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studio.dto';

import { getDetailsAnime } from '../../services/general';

const NO_DATA = '-';

/**
 * Creates list item with text.
 * @param itemText Text inner li.
 */
function createListItem(itemText: string): HTMLLIElement {
  const listItem = document.createElement('li');
  listItem.classList.add('list__item');
  listItem.innerHTML = itemText;
  return listItem;
}

/**
 * Sets src to image.
 * @param imageSrc Image URL.
 */
function setImage(imageSrc: string): void {
  const imageElement = document.querySelector<HTMLImageElement>(`.details__image`);
  if (imageElement !== null) {
    imageElement.src = imageSrc;
  }
}

/**
 * Sets text to title element.
 * @param title Title text.
 */
function setTitle(title: string): void {
  const titleElement = document.querySelector(`.details__anime-title`);
  if (titleElement !== null) {
    titleElement.innerHTML = title;
  }
}

/**
 * Sets text to synopsis element.
 * @param synopsis Synopsis text.
 */
function setSynopsis(synopsis: string): void {
  const synopsisElement = document.querySelector(`.details__anime-synopsis`);
  if (synopsisElement !== null) {
    synopsisElement.innerHTML = synopsis;
  }
}

/**
 * Sets airing element.
 * @param isAiring Airing option.
 */
function setAiring(isAiring: boolean): void {
  const airingElement = document.querySelector(`.details__anime-airing`);
  if (airingElement !== null) {
    airingElement.innerHTML = `Airing: ${isAiring ? 'Yes' : 'No'}`;
  }
}

/**
 * Sets date range to aired element.
 * @param aired Aired date range.
 */
function setAired(aired: DateRange): void {
  const airedElement = document.querySelector(`.details__anime-aired`);
  if (airedElement !== null) {
    const airedStart = aired.start ?
      aired.start.toLocaleDateString('en-GB', { timeZone: 'UTC' }) :
      NO_DATA;

    const airedEnd = aired.end ?
      aired.end.toLocaleDateString('en-GB', { timeZone: 'UTC' }) :
      NO_DATA;
    airedElement.innerHTML = `Aired: from ${airedStart} to ${airedEnd}`;
  }
}

/**
 * Sets list studios to studios element.
 * @param studios List studios.
 */
function setStudios(studios: readonly Studio[]): void {
  const studiosElement = document.querySelector(`.details__list-studios`);
  if (studiosElement !== null) {
    const studiosItems = studios.map(studio => createListItem(studio.name));

    studiosElement.append(...studiosItems);
  }
}

/**
 * Sets list genres to genres element.
 * @param genres List genres.
 */
function setGenres(genres: readonly Genre[]): void {
  const genresElement = document.querySelector(`.details__list-genres`);
  if (genresElement !== null) {
    const genresItems = genres.map(genre => createListItem(genre.name));

    genresElement.append(...genresItems);
  }
}

/**
 * Sets src to video.
 * @param trailerId Video youtube id.
 */
function setTrailer(trailerId: string): void {
  const trailerElement = document.querySelector<HTMLVideoElement>(`.anime-trailer__video`);
  if (trailerElement !== null) {
    trailerElement.src = `http://www.youtube.com/embed/${trailerId}/`;
  }
}

/**
 * Renders anime card.
 * @param anime Information about anime.
 */
function renderAnimeCard(anime: Anime): void {
  setImage(anime.image);

  setTitle(`${anime.titleEnglish || NO_DATA} / ${anime.titleJapanese || NO_DATA}`);

  setSynopsis(`${anime.synopsis ?? NO_DATA}`);

  if (anime.airing !== undefined) {
    setAiring(anime.airing);
  }

  setAired(anime.aired);

  if (anime.studiosData !== undefined) {
    setStudios(anime.studiosData);
  }

  if (anime.genresData !== undefined) {
    setGenres(anime.genresData);
  }

  if (anime.trailerYoutubeId !== undefined) {
    setTrailer(anime.trailerYoutubeId);
  }
}

/** Renders details anime. */
export async function renderDetailsAnime(): Promise<void> {
  const testAnimeId = 37;
  const anime = await getDetailsAnime(testAnimeId);

  if (anime instanceof Anime) {
    return renderAnimeCard(anime);

  }

  const URL_LOGIN_PAGE = '/login/';
  location.href = URL_LOGIN_PAGE;
}
