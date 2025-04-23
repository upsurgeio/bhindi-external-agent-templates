import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  SERVER_API_KEY: process.env.SERVER_API_KEY,
  PORT: process.env.PORT,
  TWITTER_API_KEY: process.env.TWITTER_API_KEY,
};

for (const key in ENV) {
  if (!ENV[key as keyof typeof ENV]) {
    throw new Error(`${key} environment variable is required`);
  }
}
