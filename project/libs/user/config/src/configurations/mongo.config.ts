import { plainToInstance } from 'class-transformer';
import { ConfigType, registerAs } from '@nestjs/config';

import { parsePort } from './common/parse-port';
import { DEFAULT_MONGO_PORT } from './mongodb/mongo.const';
import { MongoConfiguration } from './mongodb/mongo.env';

async function getDbConfig(): Promise<MongoConfiguration> {
  const config = plainToInstance(MongoConfiguration, {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: parsePort(process.env.MONGO_PORT, DEFAULT_MONGO_PORT),
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  });

  await config.validate();
  return config;
}

export default registerAs(
  'db',
  async (): Promise<ConfigType<typeof getDbConfig>> => {
    return getDbConfig();
  },
);
