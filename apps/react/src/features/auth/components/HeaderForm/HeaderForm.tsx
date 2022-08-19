import { Typography } from '@mui/material';
import { FC } from 'react';

interface Props {

  /** Header label. */
  readonly label: string;
}

export const HeaderForm: FC<Props> = ({ label }: Props) => (
  <Typography variant="h4" component="h1" sx={{
      marginBottom: '10px',
  }}>
    {label}
  </Typography>
);
