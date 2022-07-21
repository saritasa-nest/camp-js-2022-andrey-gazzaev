import { AnimeDetails } from '@js-camp/core/models/animeDetails';
import { DateRange } from '@js-camp/core/models/dateRange';
import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studio.dto';
import { isDefined } from '@js-camp/core/utils/guards/general.guard';

import { getDetailsAnime } from '../../services/general';
import { getDomElement } from '../general';

namespace detailsClass {
  export const TITLE = 'details__anime-title';
  export const SYNOPSIS = 'details__anime-synopsis';
  export const TYPE = 'details__anime-type';
  export const STATUS = 'details__anime-status';
  export const AIRING = 'details__anime-airing';
  export const AIRED = 'details__anime-aired';
  export const STUDIOS = 'details__list-studios';
  export const GENRES = 'details__list-genres';
  export const IMAGE = 'details__image';
  export const VIDEO = 'details__video';
}

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
  const imageElement = getDomElement<HTMLImageElement>(document, `.${detailsClass.IMAGE}`);
  const modalImageElement = getDomElement<HTMLImageElement>(document, '.modal-box__image');
  imageElement.src = imageSrc;
  modalImageElement.src = imageSrc;
}

/**
 * Sets text to title element.
 * @param title Title text.
 */
function setTitle(title: string): void {
  const titleElement = getDomElement(document, `.${detailsClass.TITLE}`);
  titleElement.innerHTML = title;
}

/**
 * Sets text to synopsis element.
 * @param synopsis Synopsis text.
 */
function setSynopsis(synopsis: string): void {
  const synopsisElement = getDomElement(document, `.${detailsClass.SYNOPSIS}`);
  synopsisElement.innerHTML = synopsis;
}

/**
 * Sets status element.
 * @param status Status text.
 */
function setStatus(status: string): void {
  const statusElement = getDomElement(document, `.${detailsClass.STATUS}`);
  statusElement.innerHTML = `Status: ${status}`;
}

/**
 * Sets type element.
 * @param type Type text.
 */
function setType(type: string): void {
  const typeElement = getDomElement(document, `.${detailsClass.TYPE}`);
  typeElement.innerHTML = `Type: ${type}`;
}

/**
 * Sets airing element.
 * @param isAiring Airing option.
 */
function setAiring(isAiring: boolean): void {
  const airingElement = getDomElement(document, `.${detailsClass.AIRING}`);
  airingElement.innerHTML = `Airing: ${isAiring ? 'Yes' : 'No'}`;
}

/**
 * Sets date range to aired element.
 * @param aired Aired date range.
 */
function setAired(aired: DateRange): void {
  const airedElement = getDomElement(document, `.${detailsClass.AIRED}`);
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
  const studiosElement = getDomElement(document, `.${detailsClass.STUDIOS}`);
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
  const genresElement = getDomElement(document, `.${detailsClass.GENRES}`);
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
  const trailerElement = getDomElement<HTMLIFrameElement>(document, `.${detailsClass.VIDEO}`);
  trailerElement.src = `http://www.youtube.com/embed/${trailerId}/`;
  if (!isDefined(trailerId)) {
    trailerElement.remove();
  }
}

/**
 * Adds anime elements to card.
 * @param anime Information about anime.
 */
function addAnimeDetails(anime: AnimeDetails): void {
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
export async function renderAnimeDetails(): Promise<void> {
  const anime = await getDetailsAnime();

  if (isDefined(anime)) {
    return addAnimeDetails(anime);
  }

  const URL_LOGIN_PAGE = '/login/';
  location.href = URL_LOGIN_PAGE;
}
