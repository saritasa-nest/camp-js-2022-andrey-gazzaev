import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Box, Grid, List, ListItem, ListItemButton, Snackbar } from '@mui/material';

import { Login } from '@js-camp/core/models/login';
import { AppError } from '@js-camp/core/models/app-error';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { loginUser, toggleSubmit } from '@js-camp/react/store/auth/dispatchers';
import { selectAreAuthLoading, selectError, selectAreAuthSubmit } from '@js-camp/react/store/auth/selectors';

import { SnackBarConfig } from '../../utils/interfaces';
import { ExtractedError, extractError } from '../../utils/error';

import { InputForm } from '../InputForm';
import { HeaderForm } from '../HeaderForm';

import { LoginFormData, signInSchema } from './formSettings';

import styles from './LoginForm.module.css';

const INITIAL_FORM_VALUE: Login = {
  email: '',
  password: '',
};

const INITIAL_SNACK_BAR: SnackBarConfig = {
  isOpen: false,
  message: '',
  duration: 1000,
};

const LoginFormComponent: FC = () => {
  const isLoading = useAppSelector(selectAreAuthLoading);
  const loginError = useAppSelector(selectError);
  const isFormSubmitted = useAppSelector(selectAreAuthSubmit);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<SnackBarConfig>(INITIAL_SNACK_BAR);

  /**
   * Handlers form submit.
   * @param LoginData Login data.
   */
  const handleSubmitForm = useCallback(({ email, password }: LoginFormData) => {
    dispatch(loginUser({ email, password }));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUE,
    validationSchema: signInSchema,
    onSubmit: handleSubmitForm,
  });

  useEffect(() => {
    if (loginError instanceof AppError) {
      setErrors(extractError(loginError));
    }
  }, [loginError]);

  useEffect(() => {
    if (isFormSubmitted) {
      navigate('/');
      dispatch(toggleSubmit());
    }
  }, [isFormSubmitted]);

  /**
   * Sets errors in form.
   * @param error Some error.
   */
  const setErrors = useCallback((error: ExtractedError) => {
    formik.setErrors(
      error.errorForFields,
    );

    setSnackbar(state => ({ ...state, isOpen: true, message: error.detail }));
  }, [formik]);

  /** Handlers snack bar close. */
  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(state => ({ ...state, isOpen: false }));
  }, []);

  return (
    <Box component="div">
      <HeaderForm label="Sign In" />
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputForm
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              required
              formik={formik}
            />
          </Grid>

          <Grid item xs={12}>
            <InputForm
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              formik={formik}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <LoadingButton
              loading={isLoading}
              loadingIndicator="Loading…"
              variant="contained"
              fullWidth
              type="submit"
            >
              Sign In
            </LoadingButton>
          </Grid>
        </Grid>

        <Box component="div">
          <List>
            <ListItem disablePadding className={styles['list-item']}>
              <Link to="#" color="inherit">
                <ListItemButton>
                  Forgot your password?
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem disablePadding className={styles['list-item']}>
              <Link to="/auth/registration/" color="inherit">
                <ListItemButton>
                  Don't have an account?
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={snackbar.duration}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Box>
  );
};

export const LoginForm = memo(LoginFormComponent);
