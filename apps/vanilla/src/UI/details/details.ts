import { Anime } from '@js-camp/core/models/anime';

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
 * Renders anime card.
 * @param anime Information about anime.
 */
function renderAnimeCard(anime: Anime): void {

  const imageElement = document.querySelector<HTMLImageElement>(`.details__image`);
  if (imageElement !== null) {
    imageElement.src = anime.image;
  }

  const titleElement = document.querySelector(`.details__anime-title`);
  if (titleElement !== null) {
    titleElement.innerHTML = `${anime.titleEnglish || NO_DATA} / ${anime.titleJapanese || NO_DATA}`;
  }

  const synopsisElement = document.querySelector(`.details__anime-synopsis`);
  if (synopsisElement !== null) {
    synopsisElement.innerHTML = `${anime.synopsis ?? NO_DATA}`;
  }

  const airingElement = document.querySelector(`.details__anime-airing`);
  if (airingElement !== null && anime.airing !== undefined) {
    const airing = anime.airing ? 'Yes' : 'No';
    airingElement.innerHTML = `Airing: ${airing}`;
  }

  const airedElement = document.querySelector(`.details__anime-aired`);
  if (airedElement !== null) {
    const airedStart = anime.aired.start ?
      anime.aired.start.toLocaleDateString('en-GB', { timeZone: 'UTC' }) :
      NO_DATA;

    const airedEnd = anime.aired.end ?
      anime.aired.end.toLocaleDateString('en-GB', { timeZone: 'UTC' }) :
      NO_DATA;
    airedElement.innerHTML = `Aired: from ${airedStart} to ${airedEnd}`;
  }

  const studiosElement = document.querySelector(`.details__list-studios`);
  if (studiosElement !== null && anime.studiosData !== undefined) {
    const studiosItems = anime.studiosData.map(studio => createListItem(studio.name));

    studiosElement.append(...studiosItems);
  }

  const genresElement = document.querySelector(`.details__list-genres`);
  if (genresElement !== null && anime.genresData !== undefined) {
    const genresItems = anime.genresData.map(studio => createListItem(studio.name));

    genresElement.append(...genresItems);
  }

  const trailerElement = document.querySelector<HTMLVideoElement>(`.anime-trailer__video`);
  if (trailerElement !== null && anime.trailerYoutubeId !== undefined) {
    trailerElement.src = `https://www.youtube.com/embed/${anime.trailerYoutubeId}`;
  }
}

/** Renders details anime. */
export async function renderDetailsAnime(): Promise<void> {
  const testAnimeId = 1;
  const anime = await getDetailsAnime(testAnimeId);

  if (anime instanceof Anime) {
    return renderAnimeCard(anime);

  }

  const URL_LOGIN_PAGE = '/login/';
  location.href = URL_LOGIN_PAGE;
}
