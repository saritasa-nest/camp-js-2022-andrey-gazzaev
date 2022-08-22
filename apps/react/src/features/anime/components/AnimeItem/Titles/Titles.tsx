import { FC, memo } from 'react';
import { Typography } from '@mui/material';

import { replaceNull } from '../../../../../features/auth/utils/text';

interface Props {

  /** Title of English. */
  readonly titleEnglish: string | null;

  /** Title of Japanese. */
  readonly titleJapanese: string | null;
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
