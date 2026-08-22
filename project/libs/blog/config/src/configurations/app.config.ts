import { plainToInstance } from 'class-transformer';
import { ConfigType, registerAs } from '@nestjs/config';

import { DEFAULT_PORT } from './application/app.const';
import { ApplicationConfiguration } from './application/app.env';
import { parsePort } from './common/parse-port';

async function getAppConfig(): Promise<ApplicationConfiguration> {
  const config = plainToInstance(ApplicationConfiguration, {
    environment: process.env.ENVIRONMENT,
    port: parsePort(process.env.PORT, DEFAULT_PORT),
  });

  await config.validate();
  return config;
}

export default registerAs(
  'application',
  async (): Promise<ConfigType<typeof getAppConfig>> => {
    return getAppConfig();
  },
);
