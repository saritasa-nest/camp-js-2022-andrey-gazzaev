
import { memo } from 'react';
import { Container } from '@mui/material';

import { Registration } from '../components/Registration/Registration';
import { Login } from '../components/Login/Login';

export const RegistrationPageComponent = () => (
  <Container component="main" maxWidth="xs">
    <Registration />
    <Login />
  </Container>
);

export const RegistrationPage = memo(RegistrationPageComponent);
