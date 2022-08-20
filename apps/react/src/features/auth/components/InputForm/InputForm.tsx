import { memo } from 'react';
import { FormikProps } from 'formik';
import { TextField, TextFieldProps } from '@mui/material';

import { isKeyOfObject } from '@js-camp/core/utils/guards/general.guard';

interface Props<T> {

  /** Formik. */
  readonly formik: FormikProps<T>;
}

const NOT_FOUND_NAME_ERROR_MESSAGE = 'Name attribute not found in formik values';

const InputFormComponent:
  <T>(props: Props<T> & TextFieldProps) => JSX.Element =
  ({ formik, name, ...props }) => {
    const { values, handleChange, touched, errors } = formik;
    const inputName = name ?? '';

    if (!isKeyOfObject(inputName, values)) {
      throw Error(NOT_FOUND_NAME_ERROR_MESSAGE);
    }

    const errorText = errors[inputName] !== undefined ? String(errors[inputName]) : null;

    return (
      <TextField
        {...props}
        value={values[inputName]}
        onChange={handleChange}
        error={touched[inputName] && Boolean(errors[inputName])}
        helperText={touched[inputName] && errorText}
      />
    );
  };

export const InputForm = memo(InputFormComponent) as typeof InputFormComponent;
