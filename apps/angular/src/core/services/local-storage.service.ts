import { Injectable } from '@angular/core';

/** Local storage service. */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  /**
   * Saves value to storage by key.
   * @param key The key by which the value is stored.
   * @param value Some value that needs to be stored.
   */
  public save<T>(key: string, value: T): Promise<void> {
    return new Promise<void>(resolve => {
      resolve(localStorage.setItem(key, JSON.stringify(value)));
    });
  }

  /**
   * Gets item from storage by key.
   * @param key The key by which the value is stored.
   */
  public get<T>(key: string): Promise<T | null> {
    return new Promise<T | null>(resolve => {
      const rawData = localStorage.getItem(key);
      if (rawData !== null) {
        resolve(JSON.parse(rawData) as T);
      }
      resolve(null);
    });
  }

  /**
   * Removes value from storage by key.
   * @param key The key by which the value is stored.
   */
  public remove(key: string): Promise<void> {
    return new Promise<void>(resolve => {
      resolve(localStorage.removeItem(key));
    });
  }
}
