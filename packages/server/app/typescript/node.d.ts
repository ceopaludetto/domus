export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTHORIZATION_KEY: string;
      DATABASE_URL: string;
    }
  }
}
