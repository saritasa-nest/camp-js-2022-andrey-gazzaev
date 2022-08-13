import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

/** App-specific implementation of app config. */
@Injectable()
export class AppConfigService {

  /** API base URL. */
  public readonly apiCampBaseUrl: string = environment.apiCampBaseUrl;

  /** API key. */
  public readonly apiCampKey: string = environment.apiCampKey;
}
