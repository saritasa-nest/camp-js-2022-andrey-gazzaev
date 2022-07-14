import { Anime } from '@js-camp/core/models/anime';

import { Table, TableBlock } from '../../constants/classes';

/** Information about column. */
interface TableColumnDef {

  /** Field in anime model. */
  field: keyof Anime;

  /** Title of column. */
  title: string;
}

const TABLE_COLUMNS: TableColumnDef[] = [
  { field: 'image', title: 'Image' },
  { field: 'titleEnglish', title: 'Title in English' },
  { field: 'titleJapanese', title: 'Title in Japanese' },
  { field: 'aired', title: 'Aired Start' },
  { field: 'type', title: 'Type' },
  { field: 'status', title: 'Status' },
];

/** Missing data in a cell. */
export const NO_DATA = '-';

/**
 * Creates and fills table rows.
 * @param animeList List of anime entries.
 */
function createTableRows(animeList: readonly Anime[]): HTMLTableRowElement[] {
  return animeList.map(anime => {
    const row = document.createElement('tr');
    row.classList.add(Table.ROW);

    TABLE_COLUMNS.forEach(({ field }) => {
      const tdElement = document.createElement('td');
      tdElement.classList.add(Table.BODY_CELL);

      const imageElement = document.createElement('img');
      imageElement.classList.add(Table.IMAGE);

      let airedStart = null;
      let airedColumnText = null;

      switch (field) {
        case 'image':
          imageElement.src = anime[field];
          imageElement.alt = `Screensaver of the anime on which the title is written - ${anime.titleEnglish || anime.titleJapanese}`;
          tdElement.append(imageElement);
          row.append(tdElement);
          break;

        case 'aired':
          airedStart = anime[field].start;
          airedColumnText = airedStart !== null ?
            new Date(airedStart).toUTCString() :
            NO_DATA;

          tdElement.innerHTML = airedColumnText;
          row.append(tdElement);
          break;

        default:
          tdElement.innerHTML = `${anime[field] || NO_DATA}`;
          row.append(tdElement);
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
  const catalogElement = document.querySelector(`.${TableBlock.TABLE}`);
  const errorElement = document.querySelector(`.${TableBlock.ERROR}`);

  if (errorElement !== null) {
    errorElement.innerHTML = '';
  }

  if (catalogElement !== null) {
    catalogElement.innerHTML = '';
  }

  if (tableRows.length === 0) {
    if (errorElement !== null) {
      errorElement.innerHTML = 'Records missing.';
    }
    return;
  }

  const catalogTitleRow = `
  <tr class="table__row">
    <th class="table__head-cell"></th>
    <th class="table__head-cell">Title in English</th>
    <th class="table__head-cell">Title in Japanese</th>
    <th class="table__head-cell">Aired Start</th>
    <th class="table__head-cell">Type</th>
    <th class="table__head-cell">Status</th>
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
