const STATIC_JSON_PATH = './assets.json'

export interface EnvConfig {
  dataUrl: String;
}


// https://vitejs.dev/guide/env-and-mode.html
export const envConfig: EnvConfig = {
  dataUrl: import.meta.env.DATA_URL || STATIC_JSON_PATH
}


