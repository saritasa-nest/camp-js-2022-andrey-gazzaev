import axios from 'axios';

import { FetchHeaders } from '../constants/fetch';

export function loginUser(
  email: string,
  password: string,
):Promise<> {
  try {
    const loginUrl = 'auth/login/';

    const instance = axios.post<>(loginUrl, {
      baseURL: ENV.baseUrl,
      headers: {
        [FetchHeaders.ApiKey]: ENV.apiKey,
      },
      postMessage: {
        email,
        password,
      },
    });

    return {

    }
  } catch {
    return {

    }
  }
}
