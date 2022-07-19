import { Tokens } from '@js-camp/core/models/tokens';

import { LocalStorageKey } from '../../constants/localStorage';

import { LocalStorageService } from './localStorage';

/** Functionality for working with Token. */
export namespace TokenService {

  /** Checks if the token exists in local storage. */
  export function isTokens(): boolean {
    return LocalStorageService.getValue<Tokens>(LocalStorageKey.TOKENS) !== null;
  }

  /**
   * Adds token to local storage.
   * @param tokens Authentication tokens.
   */
  export function setTokens(tokens: Tokens): void {
    LocalStorageService.setValue<Tokens>(LocalStorageKey.TOKENS, tokens);
  }

  /** Gets tokens from local storage. */
  export function getTokens(): Tokens | null {
    return LocalStorageService.getValue<Tokens>(LocalStorageKey.TOKENS);
  }

  /** Resets tokens. */
  export function resetTokens(): void {
    LocalStorageService.setValue(LocalStorageKey.TOKENS, null);
  }
}
