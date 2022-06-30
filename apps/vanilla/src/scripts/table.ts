import { AnimeSwitchCase, ANIME_OBJECT, NO_DATA } from '../constants/anime';
import { C_TABLE } from '../constants/classes';
import { T_IMG, T_TD, T_TR } from '../constants/tags';
import { IAnime } from '../types/anime';

/**
 * Creating and populating table rows.
 * @param animes List of anime entries.
 * @returns Array of rows.
 */
const createTableRows = (animes: IAnime[]): HTMLTableRowElement[] => animes.map(anime => {
  const row = document.createElement(T_TR);

    for (const key in ANIME_OBJECT) {
      const thElement = document.createElement(T_TD);
      const imageElement = document.createElement(T_IMG);
      const titleKey = String(ANIME_OBJECT[key]);
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
          // Add title in English and Japanese.
          thElement.innerHTML = `${anime[titleKey] || NO_DATA}`;
          row.append(thElement);
          break;

        default:
          // Adding all other fields.
          thElement.innerHTML = `${anime[key] || NO_DATA}`;
          row.append(thElement);
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
  const catalogElement = document.querySelector(C_TABLE);
  const catalogTitleRow = `<tr>
    <th></th>
    <th>Title in English</th>
    <th>Title in Japanese</th>
    <th>Aired Start</th>
    <th>Type</th>
    <th>Status</th>
  </tr>`;

  if (catalogElement) {
    catalogElement.innerHTML = catalogTitleRow;
    catalogElement.append(...tableRows);
  }
};

/**
 * Fill the table with information about anime.
 * @param animes List of anime entries.
 */
export const fillTableAnime = (animes: IAnime[]): void => {
  const tableRows = createTableRows(animes);

  return updateTableAnime(tableRows);
};
