import { LoadingButton } from '@mui/lab';
import { Grid, MenuItem, Paper } from '@mui/material';
import { Field, FormikProvider, useFormik } from 'formik';
import { Select, TextField } from 'formik-mui';
import { memo } from 'react';

import { AnimeStatus, AnimeType } from '@js-camp/core/models/anime';
import { Rating, Season, Source } from '@js-camp/core/models/anime-editor';

import styles from './EditorForm.module.css';

const types = Object.values(AnimeType);
const statuses = Object.values(AnimeStatus);
const sources = Object.values(Source);
const seasons = Object.values(Season);
const ratings = Object.values(Rating);

interface FormFields {

  /** YouTube URL ID. */
  readonly trailerYoutubeId: string;

  /** Title in English. */
  readonly titleEnglish: string;

  /** Title in Japanese. */
  readonly titleJapanese: string;

  /** Synopsis. */
  readonly synopsis: string;

  /** Type. */
  readonly type: null | AnimeType;

  /** Status. */
  readonly status: null | AnimeStatus;

  /** Rating. */
  readonly rating: null | Rating;

  /** Season. */
  readonly season: null | Season;

  /** Source. */
  readonly source: null | Source;
}

const INITIAL_FORM_VALUES: FormFields = {
  trailerYoutubeId: '',
  titleEnglish: '',
  titleJapanese: '',
  synopsis: '',
  type: null,
  status: null,
  rating: null,
  season: null,
  source: null,
};

const EditorFormComponent = () => {
  const isLoading = false;

  const handleFormSubmit = (formValues: FormFields) => {
    console.log(formValues);
  };

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUES,
    onSubmit: handleFormSubmit,
  });

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
              name="trailerYoutubeId"
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

          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Field
                className={styles.selectField}
                component={Select}
                name="type"
                label="Type"
                required
              >
                {types.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
              </Field>
            </Grid>

            <Grid item xs={1}>
              <Field
                className={styles.selectField}
                component={Select}
                name="status"
                label="Status"
                required
              >
                {statuses.map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
              </Field>
            </Grid>

            <Grid item xs={1}>

              <Field
                className={styles.selectField}
                component={Select}
                name="rating"
                label="Rating"
                required
              >
                {ratings.map(rating => <MenuItem key={rating} value={rating}>{rating}</MenuItem>)}
              </Field>
            </Grid>

            <Grid item xs={1}>
              <Field
                className={styles.selectField}
                component={Select}
                name="source"
                label="Source"
                required
              >
                {sources.map(source => <MenuItem key={source} value={source}>{source}</MenuItem>)}
              </Field>
            </Grid>

            <Grid item xs={1}>
              <Field
                className={styles.selectField}
                component={Select}
                name="season"
                label="Season"
                required
              >
                {seasons.map(season => <MenuItem key={season} value={season}>{season}</MenuItem>)}
              </Field>
            </Grid>
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
  );
};

export const EditorForm = memo(EditorFormComponent);
