import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { Box, Grid, List, ListItem, ListItemButton, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';

import { AppError } from '@js-camp/core/models/app-error';
import { registrationUser, toggleSubmit } from '@js-camp/react/store/auth/dispatchers';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { selectAreAuthLoading, selectError, selectAreAuthSubmit } from '@js-camp/react/store/auth/selectors';

import { ExtractedError, extractError } from '../../utils/error';

import { HeaderForm } from '../HeaderForm/HeaderForm';

import { RegistrationFormData, signUpSchema } from './formSettings';

const INITIAL_USER = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const INITIAL_FORM_VALUE = {
  ...INITIAL_USER,
  passwordConfirm: '',
};

export const RegistrationFormComponent: FC = () => {
  const isLoading = useAppSelector(selectAreAuthLoading);
  const registrationError = useAppSelector(selectError);
  const isFormSubmitted = useAppSelector(selectAreAuthSubmit);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: '',
    duration: 1000,
  });

  const handleSubmitForm = useCallback(({ email, firstName, lastName, password }: RegistrationFormData) => {
    dispatch(registrationUser({ email, firstName, lastName, password }));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUE,
    validationSchema: signUpSchema,
    onSubmit: handleSubmitForm,
  });

  useEffect(() => {
    if (isFormSubmitted) {
      navigate('/');
      dispatch(toggleSubmit());
    }
  }, [isFormSubmitted]);

  useEffect(() => {
    if (registrationError instanceof AppError) {
      setErrors(extractError(registrationError));
    }
  }, [registrationError]);

  const setErrors = useCallback((error: ExtractedError) => {
    formik.setErrors(
      error.errorForFields,
    );

    setSnackbar(state => ({ ...state, isOpen: true, message: error.detail }));
  }, [formik]);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(state => ({ ...state, isOpen: false }));
  }, []);

  return (
    <Box component="div">
      <HeaderForm label="Sign Up" />
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First name"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="LastName"
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              required
            />
          </Grid>

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
            <TextField
              fullWidth
              id="passwordConfirm"
              name="passwordConfirm"
              label="Password confirm"
              type="password"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
              helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
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
              Sign Up
            </LoadingButton>
          </Grid>
        </Grid>

        <Box component="div">
          <List>
            <ListItem disablePadding sx={{
              justifyContent: 'center',
            }}>
              <Link to="/auth/login/" color="inherit">
                <ListItemButton>
                  Do you have an account?
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

export const RegistrationForm = memo(RegistrationFormComponent);
