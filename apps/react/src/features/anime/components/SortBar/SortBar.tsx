import { memo, useState } from 'react';
import { Box, Button, Collapse, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
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

const SortBarComponent = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortField, setSortField] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSortField(event.target.value);
  };

  const handleSortToggle = () => {
    setIsSortOpen(!isSortOpen);
  };

  return (
    <Box>
      <Box>
        <Collapse in={isSortOpen} orientation="horizontal">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={sortField}
              onChange={handleChange}
              label="Sort"
            >
              {sortList.map(item => <MenuItem value={item.field}>{item.title}</MenuItem>)}
            </Select>
          </FormControl>
        </Collapse>
      </Box>

      <Button onClick={handleSortToggle}>
        <SortIcon />
      </Button>
    </Box>
  );
};

export const SortBar = memo(SortBarComponent);
