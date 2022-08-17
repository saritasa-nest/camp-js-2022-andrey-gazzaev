
import { memo } from 'react';
import { Container } from '@mui/material';

import { Registration } from '../components/Registration/Registration';

export const RegistrationPageComponent = () => (
  <Container component="main" maxWidth="xs">
    <Registration />
  </Container>
);

export const RegistrationPage = memo(RegistrationPageComponent);
