import { AnimeObject } from '../constants/anime';
import { IAnime } from '../types/anime';

const createTableRows = (animes: IAnime[]) => {
  return animes.map((anime) => {
    const row = document.createElement('tr');

    for (const key in AnimeObject) {
      const thElement = document.createElement('th');
      switch (key) {
        case AnimeObject.image:
          const imageElement = document.createElement('img');
          imageElement.src = anime[key];
          thElement.append(imageElement);
          row.append(thElement);
          break;
        case AnimeObject.aired:
          let aired = 'none';
          if (anime[key].start) {
            aired = new Date(anime[key].start).toUTCString();
          }
          thElement.innerHTML = aired;
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
};

const updateTableAnime = (tableRows: HTMLTableRowElement[]) => {
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
 * @param anime List of anime entries.
 */
export const fillTableAnime = (animes: IAnime[]) => {
  const tableRows = createTableRows(animes);

  updateTableAnime(tableRows);
};
