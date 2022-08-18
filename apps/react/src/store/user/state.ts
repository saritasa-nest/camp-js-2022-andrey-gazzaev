import { User } from '@js-camp/core/models/user';

/** Genres state. */
export interface UserState {

  /** Genres list. */
  readonly user: User | null;

  /** Error. */
  readonly error?: string;

  /** Whether the genres are loading or not. */
  readonly isLoading: boolean;
}

export const initialState: UserState = {
  isLoading: false,
  user: null,
};
