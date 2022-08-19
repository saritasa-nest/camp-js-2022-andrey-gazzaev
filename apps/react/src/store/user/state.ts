import { User } from '@js-camp/core/models/user';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<User>({
  selectId: user => user.email,
});

/** User state. */
export interface UserState {

  /** Error. */
  readonly error?: string;

  /** Whether user are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = entityAdapter.getInitialState<UserState>({
  isLoading: true,
});

export type State = typeof initialState;
