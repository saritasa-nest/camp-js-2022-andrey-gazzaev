import * as yup from 'yup';
import { Login as LoginData } from '@js-camp/core/models/login';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { memo, useState } from 'react';

interface FormData {

  /** Email. */
  readonly email: string;

  /** Password.  */
  readonly password: string;
}

const INITIAL_FORM_VALUE = {
  email: '',
  password: '',
};

const EMAIL_ERROR_MESSAGES = 'Email is required';
const PASSWORD_ERROR_MESSAGES = 'Password is required';

const signInSchema: yup.SchemaOf<FormData> = yup.object({
  email: yup
    .string()
    .required(EMAIL_ERROR_MESSAGES),
  password: yup
    .string()
    .required(PASSWORD_ERROR_MESSAGES),
});

export const LoginComponent = () => {
  const [user, setNewUser] = useState<LoginData>(INITIAL_FORM_VALUE);

  const handleSubmitForm = ({ email, password }: FormData) => {
    setNewUser({ email, password });
  };

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

export const Login = memo(LoginComponent);
