
import { FC, memo } from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const AuthPageComponent: FC = () => (
  <Container maxWidth="xs">
    <Outlet />
  </Container>
);

export const AuthPage = memo(AuthPageComponent);
