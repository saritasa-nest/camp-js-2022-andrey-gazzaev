import { FC, memo } from 'react';
import { Typography } from '@mui/material';

import { replaceNull } from '../../../../../features/auth/utils/text';

interface Props {

  /** Title in English. */
  readonly titleEnglish: string;

  /** Title in Japanese. */
  readonly titleJapanese: string;
}

const AnimeTitlesComponent: FC<Props> = ({ titleEnglish, titleJapanese }) => (
  <>
    <Typography
      variant="subtitle1"
      color="text.primary"
    >
      {replaceNull(titleEnglish)}
    </Typography>
    <Typography
      variant="subtitle2"
      color="text.primary"
    >
      {replaceNull(titleJapanese)}
    </Typography>
  </>
);

export const Titles = memo(AnimeTitlesComponent);
