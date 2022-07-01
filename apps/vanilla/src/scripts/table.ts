import { Anime } from '@js-camp/core/models/anime';

import { TableСolumns, ANIME_TABLE, NO_DATA } from '../constants/anime';
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

    for (const key in ANIME_TABLE) {
      const thElement = document.createElement(Tag.TD);
      thElement.classList.add(Catalog.TABLE_BODY.replace('.', ''));

      const imageElement = document.createElement(Tag.IMG);
      imageElement.classList.add(Catalog.TABLE_IMAGE.replace('.', ''));

      const aired = anime[TableСolumns.Aired].start !== null ?
        new Date(anime[TableСolumns.Aired].start).toUTCString() :
        NO_DATA;

      switch (key) {
        case TableСolumns.Image:
          // Add an image to a table.
          imageElement.src = anime[key];
          thElement.append(imageElement);
          row.append(thElement);
          break;

        case TableСolumns.Aired:
          // Add an entry for aired start.
          thElement.innerHTML = aired;
          row.append(thElement);
          break;

        case TableСolumns.TitleEng:
        case TableСolumns.TitleJpn:
        case TableСolumns.Type:
        case TableСolumns.Status:
          // Add title in English and Japanese, Type, Status.
          thElement.innerHTML = `${anime[key] || NO_DATA}`;
          row.append(thElement);
          break;

        default:
          // It is necessary to skip fields that should not be included in the table.
          break;
      }
    }
    return row;
  });
}

/**
 * Renders table on the page.
 * @param tableRows Array of rows.
 */
function updateTableAnime(tableRows: readonly HTMLTableRowElement[]): void {
  const catalogElement = document.querySelector(Catalog.TABLE);
  const catalogTitleRow = `<tr class="catalog__table-row">
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
