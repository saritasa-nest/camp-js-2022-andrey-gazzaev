import { concatWith, defer, distinctUntilChanged, Observable, raceWith, ReplaySubject, shareReplay, tap } from 'rxjs';

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

  /** Current user tokens. */
  private readonly currentTokensValue$ =
    new ReplaySubject<Tokens | null>(1);

  public constructor(private readonly localStorageService: LocalStorageService) {
    const tokensChange$ = this.currentTokensValue$;
    const tokensFromStorage$ = defer(() => this.localStorageService.get<Tokens>(TOKENS_STORAGE_KEY));

    this.tokens$ = tokensFromStorage$.pipe(
      concatWith(tokensChange$),
      distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y)),
      raceWith(tokensChange$),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
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
    return defer(() => this.localStorageService.save(TOKENS_STORAGE_KEY, tokens))
      .pipe(
        tap(() => this.currentTokensValue$.next(tokens)),
      );
  }
}
