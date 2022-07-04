import { Anime } from '@js-camp/core/models/anime';

import { TableColumns, NO_DATA, ANIME_TABLE_COLUMNS } from '../constants/animeTable';
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
    row.classList.add(Catalog.TABLE_ROW.replace('.', ''));

    ANIME_TABLE_COLUMNS.forEach(column => {
      const thElement = document.createElement(Tag.TD);
      thElement.classList.add(Catalog.TABLE_BODY.replace('.', ''));

      const imageElement = document.createElement(Tag.IMG);
      imageElement.classList.add(Catalog.TABLE_IMAGE.replace('.', ''));

      const aired = anime[TableColumns.Aired].start !== null ?
        new Date(anime[TableColumns.Aired].start).toUTCString() :
        NO_DATA;

      switch (column) {
        case TableColumns.Image:
          // Add an image to a table.
          imageElement.src = anime[column];
          thElement.append(imageElement);
          row.append(thElement);
          break;

        case TableColumns.Aired:
          // Add an entry for aired start.
          thElement.innerHTML = aired;
          row.append(thElement);
          break;

        case TableColumns.TitleEng:
        case TableColumns.TitleJpn:
        case TableColumns.Type:
        case TableColumns.Status:
          // Add title in English and Japanese, Type, Status.
          thElement.innerHTML = `${anime[column] || NO_DATA}`;
          row.append(thElement);
          break;

        default:
          // It is necessary to skip fields that should not be included in the table.
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

  return updateTableAnime(tableRows);
}
