/** Snack bar config. */
export interface SnackBarConfig {

  /** Is the snack bar open. */
  readonly isOpen: boolean;

  /** Message into snack bar. */
  readonly message: string;

  /** Time through automatic closing. */
  readonly duration: number;
}
