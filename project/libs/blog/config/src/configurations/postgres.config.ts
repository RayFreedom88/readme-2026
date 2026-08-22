import { plainToInstance } from 'class-transformer';
import { ConfigType, registerAs } from '@nestjs/config';

import { PostgresConfiguration } from './postgres/postgres.env';

async function getPostgresConfig(): Promise<PostgresConfiguration> {
  const config = plainToInstance(PostgresConfiguration, {
    databaseUrl: process.env.DATABASE_URL,
  });

  await config.validate();
  return config;
}

export default registerAs(
  'postgres',
  async (): Promise<ConfigType<typeof getPostgresConfig>> => {
    return getPostgresConfig();
  },
);
