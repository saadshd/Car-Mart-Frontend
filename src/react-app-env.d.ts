/// <reference types="react-scripts" />

interface ProcessEnv {
  REACT_APP_API_BASE_URL: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ProcessEnv {}
  }
}
