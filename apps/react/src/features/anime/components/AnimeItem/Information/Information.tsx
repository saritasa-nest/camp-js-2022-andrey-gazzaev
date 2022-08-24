import { FC, memo } from 'react';
import { Typography } from '@mui/material';

import { replaceNull } from '../../../../../features/auth/utils/text';

interface Props {

  /** Title of English. */
  readonly status: string;

  /** Title of Japanese. */
  readonly type: string;
}

const AnimeInformationComponent: FC<Props> = ({ status, type }) => (
  <>
    <Typography
      component="span"
      variant="body2"
      color="text.primary"
    >
      Type: {replaceNull(type)}
    </Typography>
    <br />
    <Typography
      component="span"
      variant="body2"
      color="text.primary"
    >
      Status: {replaceNull(status)}
    </Typography>
  </>
);

export const Information = memo(AnimeInformationComponent);
