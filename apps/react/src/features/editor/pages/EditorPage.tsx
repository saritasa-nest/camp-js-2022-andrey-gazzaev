import { memo } from 'react';
import { Container } from '@mui/material';

const EditorPageComponent = () => (
  <Container>
    Editor page
  </Container>
);

export const EditorPage = memo(EditorPageComponent);
