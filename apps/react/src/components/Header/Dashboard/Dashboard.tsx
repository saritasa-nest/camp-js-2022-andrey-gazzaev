import { FC, memo, useCallback, useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { logoutUser } from '@js-camp/react/store/user/dispatchers';
import { selectUser } from '@js-camp/react/store/user/selector';

const DashboardComponent: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleUserLogout = () => {
    dispatch(logoutUser());
    setAnchorEl(null);
  };

  if (user === null) {
    return <p>Oops, something went wrong.</p>;
  }

  /** Handles click on dashboard button. */
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  /** Handles click dashboard menu. */
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Box>
      <Button
        id="basic-button"
        color='inherit'
        variant="text"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem >
          <Typography
            variant="h6"
            component="span"
          >
            {user.firstName} {user.lastName}
          </Typography>

        </MenuItem>
        <MenuItem onClick={handleUserLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export const Dashboard = memo(DashboardComponent);
