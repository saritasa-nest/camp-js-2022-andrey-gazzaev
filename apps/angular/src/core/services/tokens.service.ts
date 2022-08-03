import { defer, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Tokens } from '@js-camp/core/models/tokens';

import { LocalStorageService } from './local-storage.service';

const TOKENS_STORAGE_KEY = 'tokens';

/** Tokens service. */
@Injectable({
  providedIn: 'root',
})
export class TokensService {

  /** Token info for current user. */
  private readonly tokens$: Observable<Tokens | null>;

  public constructor(private readonly localStorageService: LocalStorageService) {
    this.tokens$ = defer(() => this.localStorageService.get<Tokens>(TOKENS_STORAGE_KEY));
  }

  /** Gets tokens. */
  public get(): Observable<Tokens | null> {
    return this.tokens$;
  }

  /**
   * Saves user's tokens to local storage.
   * @param tokens The token object to be stored.
   */
  public save(tokens: Tokens): Observable<void> {
    return defer(() => this.localStorageService.save(TOKENS_STORAGE_KEY, tokens));
  }

  /** Removes user's tokens to local storage. */
  public remove(): Observable<void> {
    return defer(() => this.localStorageService.remove(TOKENS_STORAGE_KEY));
  }
}
