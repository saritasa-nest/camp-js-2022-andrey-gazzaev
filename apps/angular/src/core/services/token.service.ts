import { concatWith, defer, Observable, raceWith, ReplaySubject, shareReplay, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { Token } from '@js-camp/core/models/token';

import { StorageService } from './storage.service';

const TOKENS_STORAGE_KEY = 'tokens';

/** Tokens service. */
@Injectable({
  providedIn: 'root',
})
export class TokenService {

  /** Token info for current user. */
  private readonly token$: Observable<Token | null>;

  /** Current user tokens. */
  private readonly currentTokensValue$ = new ReplaySubject<Token | null>(1);

  public constructor(private readonly storageService: StorageService) {
    const tokensChange$ = this.currentTokensValue$;
    const tokensFromStorage$ = defer(() => this.storageService.get<Token>(TOKENS_STORAGE_KEY));

    this.token$ = tokensFromStorage$.pipe(
      concatWith(tokensChange$),
      raceWith(tokensChange$),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }

  /** Gets tokens. */
  public get(): Observable<Token | null> {
    return this.token$;
  }

  /**
   * Saves tokens.
   * @param tokens The token object to be stored.
   */
  public save(tokens: Token): Observable<void> {
    return defer(() => this.storageService.save(TOKENS_STORAGE_KEY, tokens))
      .pipe(
        tap(() => this.currentTokensValue$.next(tokens)),
      );
  }

  /** Removes tokens. */
  public remove(): Observable<void> {
    return defer(() => this.storageService.remove(TOKENS_STORAGE_KEY))
      .pipe(
        tap(() => this.currentTokensValue$.next(null)),
      );
  }
}
