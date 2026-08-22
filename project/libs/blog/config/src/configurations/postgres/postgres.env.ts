import {
  IsNotEmpty,
  IsString,
  Matches,
  validateOrReject,
} from 'class-validator';

import { EnvValidationMessage } from './postgres.messages';

export class PostgresConfiguration {
  @IsString({ message: EnvValidationMessage.DatabaseUrlRequired })
  @IsNotEmpty({ message: EnvValidationMessage.DatabaseUrlRequired })
  @Matches(/^postgres(ql)?:\/\//, {
    message: EnvValidationMessage.DatabaseUrlInvalid,
  })
  public databaseUrl!: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
