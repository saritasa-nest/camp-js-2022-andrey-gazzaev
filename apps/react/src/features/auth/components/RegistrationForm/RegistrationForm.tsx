import { TextField } from 'formik-mui';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import { Field, FormikProvider, useFormik } from 'formik';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Box, Grid, List, ListItem, ListItemButton, Snackbar } from '@mui/material';

import { AppError } from '@js-camp/core/models/app-error';
import { toggleSubmit } from '@js-camp/react/store/auth/slice';
import { Registration } from '@js-camp/core/models/registration';
import { registrationUser } from '@js-camp/react/store/auth/dispatchers';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { selectIsAuthLoading, selectError, selectIsAuthSubmitted } from '@js-camp/react/store/auth/selectors';

import { SnackBarConfig } from '../../utils/interfaces';
import { ExtractedError, extractError } from '../../utils/error';

import { HeaderForm } from '../HeaderForm/HeaderForm';

import { RegistrationFormData, signUpSchema } from './formSettings';

import styles from './RegistrationForm.module.css';

const INITIAL_USER: Registration = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const INITIAL_FORM_VALUE = {
  ...INITIAL_USER,
  passwordConfirm: '',
};

const INITIAL_SNACK_BAR: SnackBarConfig = {
  isOpen: false,
  message: '',
  duration: 1000,
};

const RegistrationFormComponent: FC = () => {
  const isLoading = useAppSelector(selectIsAuthLoading);
  const registrationError = useAppSelector(selectError);
  const isFormSubmitted = useAppSelector(selectIsAuthSubmitted);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<SnackBarConfig>(INITIAL_SNACK_BAR);

  /**
   * Handles form submit.
   * @param RegistrationData Registration data.
   */
  const handleSubmitForm = useCallback(async({ email, firstName, lastName, password }: RegistrationFormData) => {
    await dispatch(registrationUser({ email, firstName, lastName, password }));
    formik.setSubmitting(false);
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

  /** Handles snack bar close. */
  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(state => ({ ...state, isOpen: false }));
  }, []);

  return (
    <Box component="div">
      <HeaderForm label="Sign Up" />

      <FormikProvider value={formik}>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Field
                component={TextField}
                fullWidth
                id="firstName"
                name="firstName"
                label="First name"
                type="text"
                required
              />
            </Grid>

            <Grid item xs={6}>
              <Field
                component={TextField}
                fullWidth
                id="lastName"
                name="lastName"
                label="LastName"
                type="text"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                component={TextField}
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                component={TextField}
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                component={TextField}
                fullWidth
                id="passwordConfirm"
                name="passwordConfirm"
                label="Password confirm"
                type="password"
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
              <ListItem
                disablePadding
                className={styles.listItem}
              >
                <Link to="/auth/login/" color="inherit">
                  <ListItemButton>
                    Do you have an account?
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </Box>
        </Box>
      </FormikProvider>

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
