import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper } from '@mui/material';
import { Field, FormikProvider, useFormik } from 'formik';
import { TextField } from 'formik-mui';
import { memo } from 'react'

const EditorFormComponent = () => {
  const isLoading = false;

  const formik = useFormik({

  })

  return (
    <FormikProvider value={formik}>
      <Paper
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
      >

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Field
              component={TextField}
              id="youtube-id"
              name="youtubeId"
              label="Enter trailer youtube id"
              type="text"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              component={TextField}
              id="title-english"
              name="titleEnglish"
              label="Title in English"
              type="text"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              component={TextField}
              id="title-japanese"
              name="titleJapanese"
              label="Title in Japanese"
              type="text"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              component={TextField}
              id="synopsis"
              name="synopsis"
              label="Synopsis"
              multiline
              rows={2}
              maxRows={4}
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
              Save
            </LoadingButton>
          </Grid>
        </Grid>

      </Paper>
    </FormikProvider >
  )
}

export const EditorForm = memo(EditorFormComponent);
