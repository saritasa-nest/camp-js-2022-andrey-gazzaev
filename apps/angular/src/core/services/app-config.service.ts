import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

/** App-specific implementation of app config. */
@Injectable()
export class AppConfigService {

  /** API base URL. */
  public readonly apiUrl: string = environment.apiUrl;

  /** API key. */
  public readonly apiKey: string = environment.apiKey;
}
