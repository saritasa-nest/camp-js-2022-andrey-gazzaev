import { FC, memo, useEffect, useState } from 'react';
import { Box, Button, Collapse, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import styles from './SearchBar.module.css';

interface Props {

  /** Initial value form selector. */
  readonly initialValue: string;

  /** Handler search value change. */
  readonly onChange: (search: string) => void;
}
const SearchBarComponent: FC<Props> = ({ onChange, initialValue }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState(initialValue);

  useEffect(() => {
    onChange(search);
  }, [search]);

  const handleSearchToggle = () => {
    setIsSearch(!isSearch);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Box className={styles['search-bar']} >
      <Box className={styles['search']}>
        <Collapse in={isSearch} orientation="horizontal">
          <InputBase
            type='search'
            placeholder='Search...'
            onChange={handleSearchChange}
            value={search}
            className={styles['search__field']}
            inputProps={{
              className: styles['search__field-input'],
            }}
          />
        </Collapse>
      </Box>
      <Button onClick={handleSearchToggle}>
        {!isSearch ? <SearchIcon /> : <SearchOffIcon />}
      </Button>
    </Box>
  );
};

export const SearchBar = memo(SearchBarComponent);
