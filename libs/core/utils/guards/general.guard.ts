type NonNullableFields<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

/**
 * Checks if a value is defined.
 * @param value Some value.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  if (value !== null && value !== undefined) {
    return true;
  }
  return false;
}

/**
 * Checks if all fields value is defined.
 * @param fields Some object or form fields.
 */
export function isFieldsDefined<T>(fields: T): fields is NonNullableFields<T> {
  for (const key in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, key) && !isDefined(fields[key])) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if the key belongs to the object.
 * @param key Some key.
 * @param object Some object.
 */
export function isKeyOfObject<T>(key: string | number | symbol, object: T): key is keyof T {
  return key in object;
}
