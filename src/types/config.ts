export type Env = {
  NODE_ENV: 'development' | 'production' | 'test';
  AUTH_SECRET: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_CLIENT_ID: string;
}

export type PageProps = {
  env: Env
}

// Define what API URL to use
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5073/api'; 