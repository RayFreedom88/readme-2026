import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { PostType } from '@project/core';

import {
  CREATE_POST_DTO_BY_TYPE,
  type CreatePostDto,
} from '../dto/create-post.dto';
import { validateDto } from '../dto/validate-dto';

@Injectable()
export class CreatePostPipe implements PipeTransform {
  public async transform(value: unknown): Promise<CreatePostDto> {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Validation failed');
    }

    const type = (value as { type?: unknown }).type;
    const DtoClass = CREATE_POST_DTO_BY_TYPE[type as PostType];

    if (!DtoClass) {
      throw new BadRequestException('Invalid post type');
    }

    return validateDto(DtoClass as new () => CreatePostDto, value);
  }
}
