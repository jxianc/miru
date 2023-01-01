declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      DATABASE_URL: string
      ACCESS_TOKEN_SECRET: string
      REFRESH_TOKEN_SECRET: string
      REFRESH_TOKEN_COOKIE_KEY: string
      CLIENT_ORIGIN: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      GOOGLE_CALLBACK_URL: string
    }
  }
}

export {}
