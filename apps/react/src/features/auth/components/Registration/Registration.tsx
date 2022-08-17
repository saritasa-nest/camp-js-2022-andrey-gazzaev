import * as yup from 'yup';
import { memo, useState } from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';

import { Registration as RegistrationData } from '@js-camp/core/models/registration';
import { Box, Button, Grid, Typography } from '@mui/material';

/* eslint-disable-next-line */
export interface RegistrationProps { }

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

export const RegistrationComponent = () => {
  const [newUser, setNewUser] = useState<RegistrationData>(INITIAL_USER);

  const handleSubmitForm = ({ email, firstName, lastName, password }: FormData) => {
    setNewUser({ email, firstName, lastName, password });
  };

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUE,
    validationSchema: signUpSchema,
    onSubmit: handleSubmitForm,
  });

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
    </Box>
  );
};

export const Registration = memo(RegistrationComponent);
