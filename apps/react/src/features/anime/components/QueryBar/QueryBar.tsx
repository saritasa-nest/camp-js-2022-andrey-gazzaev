import {
  Box,
  Checkbox,
  FormControl,
  InputBase,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

import { AnimeSortField, AnimeType } from '@js-camp/core/models/anime';
import { AnimeListQueryParams } from '@js-camp/core/models/anime-list-query-params';

import { ToggleInput } from '../ToggleInput';

import styles from './QueryBar.module.css';

interface Props {

  /** Initial query params. */
  readonly initialQuery: AnimeListQueryParams;

  /** Handles query params change.*/
  readonly onQueryParamsChange: (queryParams: AnimeListQueryParams) => void;
}

const sortList = [
  {
    title: 'Title in English',
    field: 'titleEnglish',
  },
  {
    title: 'Aired start',
    field: 'aired',
  },
  {
    title: 'Status',
    field: 'status',
  },
];

const filterList = Object.values(AnimeType);

const QueryBarComponent: FC<Props> = ({ initialQuery, onQueryParamsChange }) => {
  const [types, setTypes] = useState<readonly AnimeType[]>(initialQuery.types);
  const [search, setSearch] = useState(initialQuery.search);
  const [sortField, setSortField] = useState(initialQuery.sort.field);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value);
  }, []);

  const handleFilterChange = useCallback((event: SelectChangeEvent<typeof types>) => {
    const {
      target: { value },
    } = event;
    if (typeof value === 'string') {
      return;
    }
    setTypes(value);
  }, []);

  const handleSortChange = useCallback((event: SelectChangeEvent) => {
    setSortField(event.target.value as AnimeSortField);
  }, []);

  useEffect(() => {
    onQueryParamsChange(
      {
        ...initialQuery,
        search,
        types,
        sort: { field: sortField, direction: initialQuery.sort.direction },
      },
    );
  }, [search, types, sortField]);

  return (
    <Box className={styles['query-bar']}>
      <ToggleInput
        iconOpen={<SearchIcon />}
        iconClose={<SearchOffIcon />}
      >
        <InputBase
          type='search'
          placeholder='Search...'
          value={search}
          className={styles['search']}
          onChange={handleSearchChange}
          inputProps={{
            className: styles['search__input'],
          }}
        />
      </ToggleInput>

      <ToggleInput
        iconOpen={<FilterListIcon />}
        iconClose={<FilterListOffIcon />}
      >
        <FormControl variant="standard">
          <InputLabel id="type-filter">Type</InputLabel>
          <Select
            labelId="type-filter"
            multiple
            value={types}
            className={styles['filter']}
            onChange={handleFilterChange}
            renderValue={selected => selected.join(', ')}
          >
            {filterList.map(filter => (
              <MenuItem
                key={filter}
                value={filter}
              >
                <Checkbox checked={types.includes(filter as AnimeType)} />
                <ListItemText primary={filter} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ToggleInput>

      <ToggleInput
        iconOpen={<SortIcon />}
        iconClose={<SortIcon />}
      >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="sort-select">Sort</InputLabel>
          <Select
            label="Sort"
            labelId="sort-select"
            value={sortField}
            onChange={handleSortChange}
          >
            {sortList.map(item => <MenuItem
              key={item.field}
              value={item.field}
            >
              {item.title}
            </MenuItem>)}
          </Select>
        </FormControl>
      </ToggleInput>
    </Box>
  );
};

export const QueryBar = memo(QueryBarComponent);
