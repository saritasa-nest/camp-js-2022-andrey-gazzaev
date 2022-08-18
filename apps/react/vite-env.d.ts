// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMetaEnv {

  /** API key. */
  readonly VITE_API_KEY: string;

  /** Api base url. */
  readonly VITE_BASE_URL: string;

}

interface ImportMeta {

  /** Contains application environment data. */
  readonly env: ImportMetaEnv;
}
