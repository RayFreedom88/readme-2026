import {
  IsIn,
  IsInt,
  IsOptional,
  Max,
  Min,
  validateOrReject,
} from 'class-validator';

import { DEFAULT_PORT, ENVIRONMENTS } from './app.const';
import { EnvValidationMessage } from './app.messages';

import { PortRange } from '../common/const';

export type Environment = (typeof ENVIRONMENTS)[number];

export class ApplicationConfiguration {
  @IsIn(ENVIRONMENTS, { message: EnvValidationMessage.AppEnvironmentRequired })
  public environment!: Environment;

  @IsInt({ message: EnvValidationMessage.AppPortInvalid })
  @Min(PortRange.Min)
  @Max(PortRange.Max)
  @IsOptional()
  public port: number = DEFAULT_PORT;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
