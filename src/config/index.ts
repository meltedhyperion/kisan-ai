import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().regex(/^\d+$/).optional().default('5050'),
  LEVEL: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).optional().default('silly'),
  PREFIX: z.string().optional().default('/api'),
});

const parsedSchema = envSchema.parse(process.env);

export type EnvSchemaType = z.infer<typeof envSchema>;

export default {
  NODE_ENV: parsedSchema.NODE_ENV,

  PORT: parsedSchema.PORT,

  LOGS: {
    LEVEL: parsedSchema.LEVEL,
  },

  API: {
    PREFIX: parsedSchema.PREFIX,
  },

  // AWS: {
  //   region: parsedSchema.AWS_REGION,
  //   clientKey: parsedSchema.AWS_CLIENT_KEY,
  //   clientSecret: parsedSchema.AWS_CLIENT_SECRET,
  //   bucketName: parsedSchema.AWS_BUCKET_NAME,
  // },
};
