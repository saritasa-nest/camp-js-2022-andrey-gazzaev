import { FC, memo, useCallback, useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { logoutUser } from '@js-camp/react/store/user/dispatchers';
import { selectUser } from '@js-camp/react/store/user/selector';
import { useNavigate } from 'react-router-dom';

const DashboardComponent: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** Handles user logout. */
  const handleUserLogout = useCallback(() => {
    dispatch(logoutUser());
    setAnchorEl(null);
  }, []);

  /** Handles click on dashboard button. */
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  /** Handles click dashboard menu. */
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  /** Handles redirect user to editor page. */
  const handleGoToEditorPage = () => {
    navigate('/editor', { replace: true });
  };

  if (user === null) {
    return <p>Oops, something went wrong.</p>;
  }

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
        <MenuItem onClick={handleGoToEditorPage}>Add new anime</MenuItem>
        <MenuItem onClick={handleUserLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export const Dashboard = memo(DashboardComponent);
