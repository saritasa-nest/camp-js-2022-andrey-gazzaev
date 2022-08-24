import { AnimeStatus, AnimeType } from '@js-camp/core/models/anime';
import { Season, Source } from '@js-camp/core/models/anime-editor';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, InputLabel, MenuItem, Paper, Rating, Select } from '@mui/material';
import { Field, FormikProvider, useFormik } from 'formik';
import { TextField } from 'formik-mui';
import { memo } from 'react'

const types = Object.values(AnimeType);
const statuses = Object.values(AnimeStatus);
const sources = Object.values(Source);
const seasons = Object.values(Season);
const ratings = Object.values(Rating);

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
            <InputLabel id="types">Type</InputLabel>
            <Field
              component={Select}
              id="types"
              name="types"
              label="Type"
              required
            >
              {types.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
            </Field>
          </Grid>

          <Grid item xs={12}>
            <InputLabel id="statuses">Status</InputLabel>
            <Field
              component={Select}
              id="statuses"
              name="statuses"
              label="Status"
              required
            >
              {statuses.map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
            </Field>
          </Grid>

          <Grid item xs={12}>
            <InputLabel id="ratings">Rating</InputLabel>
            <Field
              component={Select}
              id="ratings"
              name="ratings"
              label="Rating"
              required
            >
              {ratings.map(rating => <MenuItem key={rating} value={rating}>{rating}</MenuItem>)}
            </Field>
          </Grid>

          <Grid item xs={12}>
            <InputLabel id="sources">Source</InputLabel>
            <Field
              component={Select}
              id="sources"
              name="sources"
              label="Source"
              required
            >
              {sources.map(source => <MenuItem key={source} value={source}>{source}</MenuItem>)}
            </Field>
          </Grid>

          <Grid item xs={12}>
            <InputLabel id="seasons ">Seasons</InputLabel>
            <Field
              component={Select}
              id="seasons"
              name="seasons"
              label="Season"
              required
            >
              {seasons.map(season => <MenuItem key={season} value={season}>{season}</MenuItem>)}
            </Field>
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
