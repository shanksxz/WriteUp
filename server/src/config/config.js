import { z } from "zod";
import dotenv from "dotenv";

// change .env to .env.local if you want to use a local environment file
dotenv.config({
  path: ".env",
});

const configSchema = z.object({
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  // JWT_EXPIRATION: z.string(),
});

const envVars = configSchema.parse(process.env);

// module.exports = {
//     PORT: envVars.PORT,
//     DATABASE_URL: envVars.DATABASE_URL,
//     JWT_SECRET: envVars.JWT_SECRET,
//     // JWT_EXPIRATION: envVars.JWT_EXPIRATION,
// }

export const PORT = envVars.PORT;
export const DATABASE_URL = envVars.DATABASE_URL;
export const JWT_SECRET = envVars.JWT_SECRET;

