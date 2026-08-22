import { plainToInstance } from 'class-transformer';
import { validate, type ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

function flattenValidationErrors(errors: ValidationError[]): string[] {
  return errors.flatMap((error) => [
    ...Object.values(error.constraints ?? {}),
    ...flattenValidationErrors(error.children ?? []),
  ]);
}

export async function validateDto<T extends object>(
  DtoClass: new () => T,
  payload: unknown,
): Promise<T> {
  const instance = plainToInstance(DtoClass, payload);
  const errors = await validate(instance, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length > 0) {
    throw new BadRequestException(flattenValidationErrors(errors));
  }

  return instance;
}
