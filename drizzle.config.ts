import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

interface Config {
  schema: string;
  dialect: "postgresql";
  dbCredentials: {
    url: string;
  };
  verbose: boolean;
  strict: boolean;
}

export default defineConfig({
  schema: "./utils/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DATABASE,
  },
  verbose: true,
  strict: true,
} as Config);
