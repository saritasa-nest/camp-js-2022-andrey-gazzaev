import { FC, memo, ReactNode, useCallback, useState } from 'react';
import { Box, Button, Collapse } from '@mui/material';

import styles from './ToggleInput.module.css';

interface Props {

  /** The icon that is displayed on opening the field. */
  readonly iconOpen: ReactNode;

  /** The icon that is displayed on the closing field. */
  readonly iconClose: ReactNode;

  /** Elements inside a components. */
  readonly children: ReactNode;
}

const ToggleInputComponent: FC<Props> = ({ iconOpen, iconClose, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <Box className={styles['toggle']} >
      <Box className={styles['toggle-input']}>
        <Collapse in={isOpen} orientation="horizontal">
          {children}
        </Collapse>
      </Box>
      <Button onClick={handleToggle}>
        {!isOpen ? iconOpen : iconClose}
      </Button>
    </Box>
  );
};

export const ToggleInput = memo(ToggleInputComponent);
