import { memo, useCallback, useEffect, useState } from 'react';
import { Box, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { AppError } from '@js-camp/core/models/app-error';
import { loginUser } from '@js-camp/react/store/auth/dispatchers';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { selectAreAuthLoading, selectError, selectIsSubmit } from '@js-camp/react/store/auth/selectors';

import { ExtractedError, extractError } from '../../utils/error';

import { LoginFormData, signInSchema } from './formSettings';

const INITIAL_FORM_VALUE = {
  email: '',
  password: '',
};

export const LoginFormComponent = () => {
  const isLoading = useAppSelector(selectAreAuthLoading);
  const loginError = useAppSelector(selectError);
  const isSubmitForm = useAppSelector(selectIsSubmit);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: '',
    duration: 1000,
  });

  useEffect(() => {
    if (loginError instanceof AppError) {
      setErrors(extractError(loginError));
    }
  }, [loginError]);

  useEffect(() => {
    if (isSubmitForm) {
      navigate('/');
    }
  }, [isSubmitForm]);

  const setErrors = (error: ExtractedError) => {
    formik.setErrors(
      error.errorForFields,
    );

    setSnackbar(state => ({ ...state, isOpen: true, message: error.detail }));
  };

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(state => ({ ...state, isOpen: false }));
  };

  const handleSubmitForm = useCallback(({ email, password }: LoginFormData) => {
    dispatch(loginUser({ email, password }));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUE,
    validationSchema: signInSchema,
    onSubmit: handleSubmitForm,
  });

  return (
    <Box component="div">
      <Typography variant="h4" component="h1" sx={{
        marginBottom: '10px',
      }}>
        Sign In
      </Typography>
      <Box component="form" noValidate onSubmit={formik.handleSubmit} >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
