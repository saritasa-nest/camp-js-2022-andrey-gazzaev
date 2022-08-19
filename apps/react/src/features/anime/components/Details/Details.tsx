import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { memo } from 'react';

const DetailsComponent = () => (
  <Container>
    <Box>
      <Typography component="h2" variant="h4">
        Please select an anime
      </Typography>
    </Box>
  </Container>
);

export const Details = memo(DetailsComponent);
