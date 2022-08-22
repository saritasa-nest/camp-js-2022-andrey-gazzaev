import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import styles from './HeaderForm.module.css';

interface Props {

  /** Header label. */
  readonly label: string;
}

export const HeaderForm: FC<Props> = ({ label }: Props) => (
  <Box>
    <Typography
      variant="h4"
      component="h1"
      className={styles['formHeaderText']}
    >
      {label}
    </Typography>
  </Box>
);
