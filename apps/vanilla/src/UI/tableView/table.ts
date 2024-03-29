import { AnimeBase } from '@js-camp/core/models/anime';
import { isDefined } from '@js-camp/core/utils/guards/general.guard';

import { Table, TableBlock } from '../../constants/classes';
import { QueryParamsService } from '../../services/domain/queryParams';
import { getDomElement } from '../general';

/** Information about column. */
interface TableColumnDef {

  /** Field in anime model. */
  readonly field: keyof AnimeBase;

  /** Title of column. */
  readonly title: string;
}

const TABLE_COLUMNS: readonly TableColumnDef[] = [
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
 * Go to details card of anime.
 * @param id ID of anime.
 */
function handleDetailsCardOpen(id: number): void {
  QueryParamsService.setDetailsParams(id);
  window.history.go();
}

/**
 * Creates and fills table rows.
 * @param animeList List of anime entries.
 */
function createTableRows(animeList: readonly AnimeBase[]): HTMLTableRowElement[] {
  return animeList.map(anime => {
    const row = document.createElement('tr');
    row.classList.add(Table.ROW);
    row.addEventListener('click', () => handleDetailsCardOpen(anime.id));

    TABLE_COLUMNS.forEach(({ field }) => {
      const tdElement = document.createElement('td');
      tdElement.classList.add(Table.BODY_CELL);

      const imageElement = document.createElement('img');
      imageElement.classList.add(Table.IMAGE);

      let airedStart = null;
      let airedColumnText = null;

      const animeCellInfo = anime[field];

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
          if (isDefined(animeCellInfo) && animeCellInfo !== '') {
            tdElement.innerHTML = `${animeCellInfo}`;
          } else {
            tdElement.innerHTML = `${NO_DATA}`;
          }

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
function updateAnimeTable(tableRows: readonly HTMLTableRowElement[]): void {
  const catalogElement = getDomElement(`.${TableBlock.TABLE}`);
  const errorElement = getDomElement(`.${TableBlock.ERROR}`);

  errorElement.innerHTML = '';
  catalogElement.innerHTML = '';

  if (tableRows.length === 0) {
    errorElement.innerHTML = 'Records missing.';
    return;
  }

  const rowHead = document.createElement('tr');
  rowHead.classList.add(Table.ROW);

  const columnsHead = TABLE_COLUMNS.map(({ title }) => {
    const thElement = document.createElement('th');
    thElement.classList.add(Table.HEAD_CELL);
    thElement.innerHTML = title;
    return thElement;
  });

  rowHead.append(...columnsHead);
  catalogElement.append(rowHead, ...tableRows);
}

/**
 * Fills the table with information about anime.
 * @param animeList List of anime entries.
 */
export function fillAnimeTable(animeList: readonly AnimeBase[]): void {
  const tableRows = createTableRows(animeList);

  updateAnimeTable(tableRows);
}
