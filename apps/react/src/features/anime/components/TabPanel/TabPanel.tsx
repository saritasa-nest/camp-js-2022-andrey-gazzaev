import { Box } from '@mui/material';
import { FC, memo, ReactNode } from 'react';

import styles from './TabPanel.module.css';

interface Props {

  /** Children of element. */
  readonly children?: ReactNode;

  /** Tab index. */
  readonly index: number;

  /** Current tab index. */
  readonly value: number;
}

const TabPanelComponent: FC<Props> = ({ children, value, index, ...props }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`query-tabpanel-${index}`}
    aria-labelledby={`query-tab-${index}`}
    className={styles.tabPanel}
    {...props}
  >
    {value === index && (
      <Box className={styles.tabPanelElement}>
        {children}
      </Box>
    )}
  </Box>
);

export const TabPanel = memo(TabPanelComponent);
