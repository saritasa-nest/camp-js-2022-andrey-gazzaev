import { Anime } from '@js-camp/core/models/anime';

import { TableColumns, NO_DATA } from '../constants/animeTable';
import { Catalog } from '../constants/classes';

/**
 * Creates and fills table rows.
 * @param animeList List of anime entries.
 * @returns Array of rows.
 */
function createTableRows(animeList: readonly Anime[]): HTMLTableRowElement[] {
  return animeList.map(anime => {
    const row = document.createElement('tr');
    row.classList.add(Catalog.TABLE_ROW);

    Object.values(TableColumns).forEach(column => {
      const thElement = document.createElement('td');
      thElement.classList.add(Catalog.TABLE_BODY);

      const imageElement = document.createElement('img');
      imageElement.classList.add(Catalog.TABLE_IMAGE);

      const airedStart = anime[TableColumns.Aired].start;
      const airedColumnText = airedStart !== null ?
        new Date(airedStart).toUTCString() :
        NO_DATA;

      switch (column) {
        case TableColumns.Image:
          imageElement.src = anime[column];
          imageElement.alt = `Image of anime ${anime.titleEnglish}`;
          thElement.append(imageElement);
          row.append(thElement);
          break;

        case TableColumns.Aired:
          thElement.innerHTML = airedColumnText;
          row.append(thElement);
          break;

        default:
          thElement.innerHTML = `${anime[column] || NO_DATA}`;
          row.append(thElement);
      }
    });

    return row;
  });
}

/**
 * Renders table on the page.
 * @param tableRows Array of rows.
 */
function updateTableAnime(tableRows: readonly HTMLTableRowElement[]): void {
  const catalogElement = document.querySelector(`.${Catalog.TABLE}`);
  const catalogTitleRow = `
  <tr class="catalog__table-row">
    <th class="catalog__table-head"></th>
    <th class="catalog__table-head">Title in English</th>
    <th class="catalog__table-head">Title in Japanese</th>
    <th class="catalog__table-head">Aired Start</th>
    <th class="catalog__table-head">Type</th>
    <th class="catalog__table-head">Status</th>
  </tr>`;

  if (catalogElement !== null) {
    catalogElement.innerHTML = catalogTitleRow;
    catalogElement.append(...tableRows);
  }
}

/**
 * Fills the table with information about anime.
 * @param animeList List of anime entries.
 */
export function fillTableAnime(animeList: readonly Anime[]): void {
  const tableRows = createTableRows(animeList);

  updateTableAnime(tableRows);
}
