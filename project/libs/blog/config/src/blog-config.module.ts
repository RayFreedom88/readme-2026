import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './configurations/app.config';
import postgresConfig from './configurations/postgres.config';

const ENV_BLOG_FILE_PATH = [
  'apps/blog/.env',
  'apps/blog/blog.env',
  'apps/blog/.env.example',
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, postgresConfig],
      envFilePath: ENV_BLOG_FILE_PATH,
    }),
  ],
})
export class BlogConfigModule {}
