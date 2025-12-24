declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HTTP_PORT?: string;
      WS_PORT?: string;
    }
  }
}

export {};
