import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayUnique,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import {
  PostPropertyDescription,
  PostTagLimit,
  TAG_PATTERN,
} from '../post.constant';

export class PostTagsDto {
  @ApiProperty({
    description: PostPropertyDescription.Tags,
    example: ['nestjs', 'typescript'],
    required: false,
    isArray: true,
    type: String,
  })
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value)
      ? [
          ...new Set(
            value.map((tag: string) => String(tag).trim().toLowerCase()),
          ),
        ]
      : value,
  )
  @IsString({ each: true })
  @ArrayMaxSize(PostTagLimit.MaxCount)
  @ArrayUnique()
  @Matches(TAG_PATTERN, { each: true })
  public tags?: string[];
}
