
import { AnimeDetails } from '@js-camp/core/models/animeDetails';
import { DateRange } from '@js-camp/core/models/dateRange';
import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studio.dto';
import { isDefine } from '@js-camp/core/utils/guards/general.guard';

import { Card } from '../../constants/classes';
import { getDetailsAnime } from '../../services/general';
import { getDomElement } from '../general';

const NO_DATA = '-';
const NO_DETAILS_DATA = 'None';
const LIST_ITEM_CLASS = 'list__item';

/**
 * Creates list item with text.
 * @param itemText Text inner li.
 */
function createListItem(itemText: string): HTMLLIElement {
  const listItem = document.createElement('li');
  listItem.classList.add(LIST_ITEM_CLASS);
  listItem.innerHTML = itemText;
  return listItem;
}

/**
 * Sets src to image.
 * @param imageSrc Image URL.
 */
function setImage(imageSrc: string): void {
  const imageElement = getDomElement<HTMLImageElement>(document, `.${Card.IMAGE}`);
  const modalImageElement = getDomElement<HTMLImageElement>(document, `.${Card.MODAL_IMAGE}`);
  imageElement.src = imageSrc;
  modalImageElement.src = imageSrc;
}

/**
 * Sets text to title element.
 * @param title Title text.
 */
function setTitle(title: string): void {
  const titleElement = getDomElement(document, `.${Card.TITLE}`);
  titleElement.innerHTML = title;
}

/**
 * Sets text to synopsis element.
 * @param synopsis Synopsis text.
 */
function setSynopsis(synopsis: string): void {
  const synopsisElement = getDomElement(document, `.${Card.SYNOPSIS}`);
  synopsisElement.innerHTML = synopsis;
}

/**
 * Sets status element.
 * @param status Status text.
 */
function setStatus(status: string): void {
  const statusElement = getDomElement(document, `.${Card.STATUS}`);
  statusElement.innerHTML = `Status: ${status}`;
}

/**
 * Sets type element.
 * @param type Type text.
 */
function setType(type: string): void {
  const typeElement = getDomElement(document, `.${Card.TYPE}`);
  typeElement.innerHTML = `Type: ${type}`;
}

/**
 * Sets airing element.
 * @param isAiring Airing option.
 */
function setAiring(isAiring: boolean): void {
  const airingElement = getDomElement(document, `.${Card.AIRING}`);
  airingElement.innerHTML = `Airing: ${isAiring ? 'Yes' : 'No'}`;
}

/**
 * Sets date range to aired element.
 * @param aired Aired date range.
 */
function setAired(aired: DateRange): void {
  const airedElement = getDomElement(document, `.${Card.AIRED}`);
  const airedStart = aired.start ?
    aired.start.toLocaleDateString('en-GB', { timeZone: 'UTC' }) :
    NO_DATA;

  const airedEnd = aired.end ?
    aired.end.toLocaleDateString('en-GB', { timeZone: 'UTC' }) :
    NO_DATA;

  airedElement.innerHTML = `Aired: from ${airedStart} to ${airedEnd}`;

}

/**
 * Sets list studios to studios element.
 * @param studios List studios.
 */
function setStudios(studios: readonly Studio[]): void {
  const studiosElement = getDomElement(document, `.${Card.STUDIOS}`);
  const studiosItems = studios.map(studio => createListItem(studio.name));
  studiosElement.append(...studiosItems);
  if (studiosItems.length === 0) {
    studiosElement.append(createListItem(NO_DETAILS_DATA));
  }
}

/**
 * Sets list genres to genres element.
 * @param genres List genres.
 */
function setGenres(genres: readonly Genre[]): void {
  const genresElement = getDomElement(document, `.${Card.GENRES}`);
  const genresItems = genres.map(genre => createListItem(genre.name));
  genresElement.append(...genresItems);
  if (genresItems.length === 0) {
    genresElement.append(createListItem(NO_DETAILS_DATA));
  }
}

/**
 * Sets src to video.
 * @param trailerId Video youtube id.
 */
function setTrailer(trailerId: string | null): void {
  const trailerElement = getDomElement<HTMLIFrameElement>(document, `.${Card.VIDEO}`);
  trailerElement.src = `http://www.youtube.com/embed/${trailerId}/`;
  if (!isDefine(trailerId) === null) {
    trailerElement.remove();
  }
}

/**
 * Renders anime card.
 * @param anime Information about anime.
 */
function renderAnimeCard(anime: AnimeDetails): void {
  setImage(anime.image);
  setTitle(`${anime.titleEnglish || NO_DATA} / ${anime.titleJapanese || NO_DATA}`);
  setSynopsis(`${anime.synopsis ?? NO_DATA}`);
  setStatus(`${anime.status}`);
  setType(`${anime.type}`);
  setAiring(anime.airing);
  setAired(anime.aired);
  setStudios(anime.studiosData);
  setGenres(anime.genresData);
  setTrailer(anime.trailerYoutubeId);
}

/** Renders details anime. */
export async function renderDetailsAnime(): Promise<void> {
  const anime = await getDetailsAnime();

  if (isDefine(anime)) {
    return renderAnimeCard(anime);
  }

  const URL_LOGIN_PAGE = '/login/';
  location.href = URL_LOGIN_PAGE;
}
