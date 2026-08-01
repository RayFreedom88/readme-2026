import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  validateOrReject,
} from 'class-validator';

import { DEFAULT_MONGO_PORT } from './mongo.const';
import { EnvValidationMessage } from './mongo.messages';

import { MAX_PORT, MIN_PORT } from '../common/const';

export class MongoConfiguration {
  @IsString({ message: EnvValidationMessage.DBNameRequired })
  @IsNotEmpty({ message: EnvValidationMessage.DBNameRequired })
  public name!: string;

  @IsString({ message: EnvValidationMessage.DBHostRequired })
  @IsNotEmpty({ message: EnvValidationMessage.DBHostRequired })
  public host!: string;

  @IsInt({ message: EnvValidationMessage.DBPortInvalid })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_MONGO_PORT;

  @IsString({ message: EnvValidationMessage.DBUserRequired })
  @IsNotEmpty({ message: EnvValidationMessage.DBUserRequired })
  public user!: string;

  @IsString({ message: EnvValidationMessage.DBPasswordRequired })
  @IsNotEmpty({ message: EnvValidationMessage.DBPasswordRequired })
  public password!: string;

  @IsString({ message: EnvValidationMessage.DBBaseAuthRequired })
  @IsNotEmpty({ message: EnvValidationMessage.DBBaseAuthRequired })
  public authBase!: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
