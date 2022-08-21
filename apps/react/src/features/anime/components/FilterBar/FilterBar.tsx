import { AnimeType } from '@js-camp/core/models/anime';
import {
  Button,
  Checkbox,
  Collapse,
  Box,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from '@mui/material';
import { FC, memo, useEffect, useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

import styles from './FilterBar.module.css';

interface Props {

  /** Handle search value change. */
  readonly onChange: (filters: readonly AnimeType[]) => void;
}

const FilterBarComponent: FC<Props> = ({ onChange }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<readonly AnimeType[]>([]);
  const [filterList, setFilterList] = useState<readonly AnimeType[]>([]);

  useEffect(() => {
    setFilterList(Object.values(AnimeType));
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof filters>) => {
    const {
      target: { value },
    } = event;
    if (typeof value === 'string') {
      return;
    }
    setFilters(value);
  };

  const handleFilterToggle = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  useEffect(() => {
    onChange(filters);
  }, [filters]);

  return (
    <Box className={styles['filters-bar']}>
      <Box className={styles['filters']}>
        <Collapse in={isFiltersOpen} orientation="horizontal">
          <FormControl variant="standard">
            <InputLabel id="type-filter">Type</InputLabel>
            <Select
              className={styles['filters__field']}
              labelId="type-filter"
              multiple
              value={filters}
              onChange={handleChange}
              renderValue={selected => selected.join(', ')}
              inputProps={{
                className: styles['filters__field-input'],
              }}
            >
              {filterList.map(filter => (
                <MenuItem key={filter} value={filter}>
                  <Checkbox checked={filters.includes(filter as AnimeType)} />
                  <ListItemText primary={filter} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Collapse>
      </Box>

      <Button onClick={handleFilterToggle} className={styles['filters__button']}>
        {!isFiltersOpen ? <FilterListIcon /> : <FilterListOffIcon />}
      </Button>
    </Box>
  );
};

export const FilterBar = memo(FilterBarComponent);
