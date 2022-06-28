import { DEFAULT_ANIME_OBJECT } from '../constants/anime';
import { IAnime } from '../types/anime';

/**
 * Fill the table with information about anime.
 * @param anime List of anime entries.
 */
export const fillTableAnime = (animes: IAnime[]) => {
  const tableRows = animes.map((anime) => {
    const row = document.createElement('tr');

    for (const key in DEFAULT_ANIME_OBJECT) {
      if (Object.prototype.hasOwnProperty.call(DEFAULT_ANIME_OBJECT, key)) {
        const thElement = document.createElement('th');
        thElement.innerHTML = `${anime[key]}`;
        row.append(thElement);
      }
    }
    return row;
  });

  const catalofElement = document.querySelector('.catalog__table');
  const catalogTitleRow = `<tr>
    <th>#</th>
    <th>Title in English</th>
    <th>Title in Japanese</th>
    <th>Type</th>
    <th>Status</th>
  </tr>`;

  if (catalofElement) {
    catalofElement.innerHTML = catalogTitleRow;
    catalofElement.append(...tableRows);
  }
};
