import { Typography } from '@mui/material';

interface Props {

  /** Header label. */
  readonly label: string;
}

export const HeaderForm = ({ label }: Props) => (
  <Typography variant="h4" component="h1" sx={{
      marginBottom: '10px',
  }}>
    {label}
  </Typography>
);
