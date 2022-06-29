import { AnimeSwitchCase, ANIME_OBJECT } from '../constants/anime';
import { IAnime } from '../types/anime';

/**
 * Creating and populating table rows.
 * @param animes List of anime entries.
 * @returns Array of rows.
 */
const createTableRows = (animes: IAnime[]): HTMLTableRowElement[] => animes.map(anime => {
  const row = document.createElement('tr');

    for (const key in ANIME_OBJECT) {
      const thElement = document.createElement('td');
      const imageElement = document.createElement('img');
      const titleKey = String(ANIME_OBJECT[key]);
      let aired = 'none';

      switch (key) {
        case AnimeSwitchCase.Image:
          imageElement.src = anime[key];
          thElement.append(imageElement);
          row.append(thElement);
          break;
        case AnimeSwitchCase.Aired:
          if (anime[AnimeSwitchCase.Aired].start) {
            aired = new Date(anime[AnimeSwitchCase.Aired].start).toUTCString();
          }
          thElement.innerHTML = aired;
          row.append(thElement);
          break;
        case AnimeSwitchCase.TitleEng:
        case AnimeSwitchCase.TitleJpn:
          thElement.innerHTML = `${anime[titleKey] || 'none'}`;
          row.append(thElement);
          break;
        default:
          thElement.innerHTML = `${anime[key] || 'none'}`;
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
  const catalofElement = document.querySelector('.catalog__table');
  const catalogTitleRow = `<tr>
    <th></th>
    <th>Title in English</th>
    <th>Title in Japanese</th>
    <th>Aired Start</th>
    <th>Type</th>
    <th>Status</th>
  </tr>`;

  if (catalofElement) {
    catalofElement.innerHTML = catalogTitleRow;
    catalofElement.append(...tableRows);
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
