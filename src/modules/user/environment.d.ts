declare global {
  namespace NodeJS {
    interface ProcessEnv {
      USER_TABLE: string;
    }
  }
}

export {};
