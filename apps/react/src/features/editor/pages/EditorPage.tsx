import { memo } from 'react';
import { Container } from '@mui/material';
import { EditorForm } from '../components/EditorForm';

const EditorPageComponent = () => (
  <Container>
    <EditorForm />
  </Container>
);

export const EditorPage = memo(EditorPageComponent);
