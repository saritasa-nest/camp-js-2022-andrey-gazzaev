import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { ChangeEvent, FC, memo, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { AnimeSortDirection, AnimeSortField, AnimeType } from '@js-camp/core/models/anime';
import { AnimeListQueryParamsWithId } from '@js-camp/core/models/anime-list-query-params';

import { TabPanel } from '../TabPanel/TabPanel';

import styles from './QueryBar.module.css';

interface Props {

  /** Initial query params. */
  readonly initialQuery: AnimeListQueryParamsWithId;

  /** Handles query params change.*/
  readonly onQueryParamsChange: (queryParams: AnimeListQueryParamsWithId) => void;
}

interface SortSelect {

  /** Title select. */
  readonly title: string;

  /** Select value. */
  readonly field: AnimeSortField;
}

const sortList: readonly SortSelect[] = [
  {
    title: 'Title in English',
    field: AnimeSortField.TitleEnglish,
  },
  {
    title: 'Status',
    field: AnimeSortField.Status,
  },
];

const filterList = Object.values(AnimeType);

/**
 * Gets accessibility props for tab.
 * @param index Tab number.
 */
function getAccessibilityProps(index: number) {
  return {
    'id': `query-tab-${index}`,
    'aria-controls': `query-tabpanel-${index}`,
  };
}

const QueryBarComponent: FC<Props> = ({ initialQuery, onQueryParamsChange }) => {
  const [tabNumber, setTabNumber] = useState(0);
  const [types, setTypes] = useState<readonly AnimeType[]>(initialQuery.types);
  const [search, setSearch] = useState(initialQuery.search);
  const [sortField, setSortField] = useState<AnimeSortField>(initialQuery.sort.field);
  const [sortDirection, setSortDirection] = useState<AnimeSortDirection>(initialQuery.sort.direction);

  /**
   * Handles search change.
   * @param event Change event.
   */
  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value);
  }, []);

  /**
   * Handles filter change.
   * @param event Select event.
   */
  const handleFilterChange = useCallback((event: SelectChangeEvent<typeof types>) => {
    const {
      target: { value },
    } = event;
    if (typeof value === 'string') {
      return;
    }
    setTypes(value);
  }, []);

  /**
   * Handles sort change.
   * @param event Select event.
   */
  const handleSortChange = useCallback((event: SelectChangeEvent) => {
    setSortField(event.target.value as AnimeSortField);
  }, []);

  /** Handles sort toggle.*/
  const handleDirectionToggle = useCallback(() => {
    setSortDirection(direction => direction === AnimeSortDirection.Ascending ?
      AnimeSortDirection.Descending :
      AnimeSortDirection.Ascending);
  }, []);

  useEffect(() => {
    onQueryParamsChange(
      {
        ...initialQuery,
        search,
        types,
        sort: { field: sortField, direction: sortDirection },
      },
    );
  }, [search, types, sortField, sortDirection]);

  /** Handles tab panel change. */
  const handleTabChange = useCallback((event: SyntheticEvent, newTabNumber: number) => {
    setTabNumber(newTabNumber);
  }, []);

  return (
    <Box className={styles.queryBar}>
      <Tabs value={tabNumber} onChange={handleTabChange} aria-label="basic tabs example">
        <Tab label="Search One" {...getAccessibilityProps(0)} />
        <Tab label="Type filter" {...getAccessibilityProps(1)} />
        <Tab label="Sort" {...getAccessibilityProps(2)} />
      </Tabs>

      <TabPanel value={tabNumber} index={0}>
        <TextField
          type='search'
          placeholder='Search...'
          value={search}
          className={styles.search}
          onChange={handleSearchChange}
          inputProps={{
            className: styles.searchInput,
          }}
        />
      </TabPanel>

      <TabPanel value={tabNumber} index={1}>
        <FormControl variant="standard">
          <InputLabel id="type-filter">Type</InputLabel>
          <Select
            labelId="type-filter"
            multiple
            value={types}
            className={styles.filter}
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
      </TabPanel>

      <TabPanel value={tabNumber} index={2}>
        <FormControl variant="standard" className={styles.sortField}>
          <InputLabel id="sort-select">Sort</InputLabel>
          <Select
            label="Sort"
            labelId="sort-select"
            value={sortField}
            onChange={handleSortChange}
            className={styles.sort}
          >
            {sortList.map(item =>
              <MenuItem
                key={item.field}
                value={item.field}
              >
                {item.title}
              </MenuItem>)}
          </Select>
          <Button type="button" onClick={handleDirectionToggle}>
            {sortDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </Button>
        </FormControl>
      </TabPanel>
    </Box>
  );
};

export const QueryBar = memo(QueryBarComponent);
