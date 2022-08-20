import { FC, memo, useEffect, useState } from 'react';
import { Box, Button, Collapse, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import styles from './SearchBar.module.css';

interface Props {

  /** Handle search value change. */
  readonly onChange: (search: string) => void;
}
const SearchBarComponent: FC<Props> = ({ onChange }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    onChange(search);
  }, [search]);

  const handlerSearchToggle = () => {
    setIsSearch(!isSearch);
  };

  const handlerSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Box className={styles['search-bar']} >
      <Box className={styles['search']}>
        <Collapse in={isSearch} orientation="horizontal">
          <InputBase
            type='search'
            placeholder='Search...'
            onChange={handlerSearchChange}
            value={search}
            className={styles['search__field']}
            inputProps={{
              className: styles['search__field-input'],
            }}
          />
        </Collapse>
      </Box>
      <Button onClick={handlerSearchToggle}>
        {!isSearch ? <SearchIcon /> : <SearchOffIcon />}
      </Button>
    </Box>
  );
};

export const SearchBar = memo(SearchBarComponent);
