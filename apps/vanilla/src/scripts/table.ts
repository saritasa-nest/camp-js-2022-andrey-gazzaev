import { Anime } from '@js-camp/core/models/anime';

import { AnimeSwitchCase, ANIME_OBJECT, NO_DATA } from '../constants/anime';
import { Catalog } from '../constants/classes';
import { Tag } from '../constants/tags';

/**
 * Creating and populating table rows.
 * @param animes List of anime entries.
 * @returns Array of rows.
 */
const createTableRows = (animes: Anime[]): HTMLTableRowElement[] => animes.map(anime => {
  const row = document.createElement(Tag.TR);

  for (const key in ANIME_OBJECT) {
    const thElement = document.createElement(Tag.TD);
    const imageElement = document.createElement(Tag.IMG);
    let aired = NO_DATA;

    switch (key) {
      case AnimeSwitchCase.Image:
        // Adding an image to a table.
        imageElement.src = anime[key];
        thElement.append(imageElement);
        row.append(thElement);
        break;

      case AnimeSwitchCase.Aired:
        // Adding an entry for aired start.
        if (anime[AnimeSwitchCase.Aired].start) {
          aired = new Date(anime[AnimeSwitchCase.Aired].start).toUTCString();
        }
        thElement.innerHTML = aired;
        row.append(thElement);
        break;

      case AnimeSwitchCase.TitleEng:
      case AnimeSwitchCase.TitleJpn:
      case AnimeSwitchCase.Type:
      case AnimeSwitchCase.Status:
        // Add title in English and Japanese, Type, Status.
        thElement.innerHTML = `${anime[key] || NO_DATA}`;
        row.append(thElement);
        break;

      default:
        break;
    }
  }
  return row;
});

/**
 * Rendering table on the page.
 * @param tableRows Array of rows.
 */
const updateTableAnime = (tableRows: HTMLTableRowElement[]): void => {
  const catalogElement = document.querySelector(Catalog.TABLE);
  const catalogTitleRow = `<tr>
    <th></th>
    <th>Title in English</th>
    <th>Title in Japanese</th>
    <th>Aired Start</th>
    <th>Type</th>
    <th>Status</th>
  </tr>`;

  if (catalogElement !== null) {
    catalogElement.innerHTML = catalogTitleRow;
    catalogElement.append(...tableRows);
  }
};

/**
 * Fill the table with information about anime.
 * @param animes List of anime entries.
 */
export const fillTableAnime = (animes: Anime[]): void => {
  const tableRows = createTableRows(animes);

  return updateTableAnime(tableRows);
};
