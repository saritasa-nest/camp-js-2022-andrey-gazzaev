import { Box, Typography } from '@mui/material';
import { FC } from 'react';

import styles from './header.module.css';

interface Props {

  /** Header label. */
  readonly label: string;
}

export const HeaderForm: FC<Props> = ({ label }: Props) => (
  <Box className={styles['header']}>
    <Typography variant="h4" component="h1" className={styles['header__text']}>
      {label}
    </Typography>
  </Box>
);
