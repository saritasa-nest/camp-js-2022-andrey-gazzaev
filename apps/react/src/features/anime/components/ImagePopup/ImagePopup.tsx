import { Dialog } from '@mui/material';
import { FC, memo } from 'react';

interface Props {

  /** URL to image. */
  readonly imageSrc: string;

  /** Is the dialog open. */
  readonly isOpen: boolean;

  /** Handles dialog close. */
  readonly onClose: () => void;
}

const ImagePopupComponent: FC<Props> = ({ isOpen, onClose, imageSrc }) => {
  /** Handles close dialog window. */
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <img src={imageSrc} alt="" />
    </Dialog>
  );
};

export const ImagePopup = memo(ImagePopupComponent);
