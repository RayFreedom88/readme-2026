import { config } from 'dotenv';
import { resolve } from 'node:path';
import { defineConfig, env } from 'prisma/config';

const envFiles = [
  resolve(process.cwd(), 'apps/blog/.env'),
  resolve(process.cwd(), 'apps/blog/blog.env'),
  resolve(process.cwd(), '../../../apps/blog/.env'),
  resolve(process.cwd(), '../../../apps/blog/blog.env'),
  resolve(process.cwd(), 'prisma/.env'),
  resolve(process.cwd(), '.env'),
];

const exampleFiles = [
  resolve(process.cwd(), 'apps/blog/.env.example'),
  resolve(process.cwd(), '../../../apps/blog/.env.example'),
  resolve(process.cwd(), 'prisma/.env.example'),
];

for (const envFile of envFiles) {
  config({ path: envFile, quiet: true });
}

for (const envFile of exampleFiles) {
  config({ path: envFile, quiet: true });
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
