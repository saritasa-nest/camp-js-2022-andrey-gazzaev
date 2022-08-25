import { Dialog } from '@mui/material';
import { FC, memo, useCallback } from 'react';

interface Props {

  /** URL to image. */
  readonly imageSrc: string;

  /** Is the dialog open. */
  readonly isOpen: boolean;

  /** Handles dialog close. */
  readonly onClose: () => void;

  /** Alternative image text. */
  readonly alt: string;
}

const ImagePopupComponent: FC<Props> = ({ isOpen, onClose, imageSrc, alt }) => {

  /** Handles close dialog window. */
  const handleClose = useCallback(() => {
    onClose();
  }, []);

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <img src={imageSrc} alt={alt} />
    </Dialog>
  );
};

export const ImagePopup = memo(ImagePopupComponent);
