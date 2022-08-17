import * as yup from 'yup';
import { memo, useState } from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { Box, Button, Grid, Snackbar, Typography } from '@mui/material';

import { Registration } from '@js-camp/core/models/registration';
import { isKeyOfObject } from '@js-camp/core/utils/guards/general.guard';
import { AppError } from '@js-camp/core/models/app-error';
import { FormError } from '@js-camp/core/models/form-error';

import { AuthService } from '../../../../api/services/authService';

interface FormData {

  /** First name. */
  readonly firstName: string;

  /** Last name. */
  readonly lastName: string;

  /** Email. */
  readonly email: string;

  /** Password.  */
  readonly password: string;

  /** Password confirm. */
  readonly passwordConfirm: string;
}

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

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/i;

const FIRST_NAME_ERROR_MESSAGE = 'First name is required';
const LAST_NAME_ERROR_MESSAGE = 'Last name is required';
const EMAIL_ERROR_MESSAGES = {
  email: 'Enter a valid email',
  required: 'Email is required',
};
const PASSWORD_ERROR_MESSAGES = {
  min: 'Password should be of minimum 8 characters length',
  matches: 'Password must be at least 1 lowercase character, at least 1 uppercase character and at least 1 digit',
  required: 'Password is required',
};
const PASSWORD_CONFIRM_ERROR_MESSAGES = {
  oneOf: 'Passwords must match',
  required: 'Password confirm is required',
};

const signUpSchema: yup.SchemaOf<FormData> = yup.object({
  firstName: yup.string().required(FIRST_NAME_ERROR_MESSAGE),
  lastName: yup.string().required(LAST_NAME_ERROR_MESSAGE),
  email: yup
    .string()
    .email(EMAIL_ERROR_MESSAGES.email)
    .required(EMAIL_ERROR_MESSAGES.required),
  password: yup
    .string()
    .min(8, PASSWORD_ERROR_MESSAGES.min)
    .matches(passwordPattern, PASSWORD_ERROR_MESSAGES.matches)
    .required(PASSWORD_ERROR_MESSAGES.required),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], PASSWORD_CONFIRM_ERROR_MESSAGES.oneOf)
    .required(PASSWORD_CONFIRM_ERROR_MESSAGES.required),
});

export const RegistrationFormComponent = () => {
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: '',
    duration: 1000,
  });

  const handleSubmitForm = async ({ email, firstName, lastName, password }: FormData) => {
    try {
      const token = await AuthService.register({ email, firstName, lastName, password });

    } catch (error: unknown) {
      if (error instanceof AppError) {
        setErrors(error);
      }
    }
  };

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUE,
    validationSchema: signUpSchema,
    onSubmit: handleSubmitForm,
  });

  const setErrors = (error: AppError<FormError<Registration>>) => {
    if (error.data) {
      const errorMessages: {
        [key: string]: string;
      } = {};

      Object.entries(error.data).forEach(([key, value]) => {
        errorMessages[key] = value[0];
      });

      formik.setErrors(
        errorMessages,
      );
    }
    setSnackbar(state => ({ ...state, isOpen: true, message: error.detail ?? 'Unknown error' }));
  };

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(state => ({ ...state, isOpen: false }));
  };

  return (
    <Box component="div">
      <Typography variant="h4" component="h1" sx={{
        marginBottom: '10px',
      }}>
        Sign Up
      </Typography>
      <Box component="form" noValidate onSubmit={formik.handleSubmit} >
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign Up
            </Button>
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

export const RegistrationForm = memo(RegistrationFormComponent);
