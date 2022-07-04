import { Anime } from '@js-camp/core/models/anime';

import { TableColumns, NO_DATA } from '../constants/animeTable';
import { Catalog } from '../constants/classes';
import { Tag } from '../constants/tag';

/**
 * Creates and fills table rows.
 * @param animes List of anime entries.
 * @returns Array of rows.
 */
function createTableRows(animes: readonly Anime[]): HTMLTableRowElement[] {
  return animes.map(anime => {
    const row = document.createElement(Tag.TR);
    row.classList.add(Catalog.TABLE_ROW);

    Object.values(TableColumns).forEach(column => {
      const thElement = document.createElement(Tag.TD);
      thElement.classList.add(Catalog.TABLE_BODY);

      const imageElement = document.createElement(Tag.IMG);
      imageElement.classList.add(Catalog.TABLE_IMAGE);

      const airedStart = anime[TableColumns.Aired].start;
      const airedColumnText = airedStart !== null ?
        new Date(airedStart).toUTCString() :
        NO_DATA;

      switch (column) {
        case TableColumns.Image:
          // Adds an image to a table.
          imageElement.src = anime[column];
          thElement.append(imageElement);
          row.append(thElement);
          break;

        case TableColumns.Aired:
          // Adds an entry for aired start.
          thElement.innerHTML = airedColumnText;
          row.append(thElement);
          break;

        default:
          // Adds more columns.
          thElement.innerHTML = `${anime[column] || NO_DATA}`;
          row.append(thElement);
          break;
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
 * @param animes List of anime entries.
 */
export function fillTableAnime(animes: readonly Anime[]): void {
  const tableRows = createTableRows(animes);

  updateTableAnime(tableRows);
}
