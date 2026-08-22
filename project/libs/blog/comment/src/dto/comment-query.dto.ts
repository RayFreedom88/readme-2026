import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  CommentPagination,
  CommentPropertyDescription,
} from '../comment.constant';

export class CommentQuery {
  @ApiPropertyOptional({
    description: CommentPropertyDescription.Page,
    example: CommentPagination.DefaultPage,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public page: number = CommentPagination.DefaultPage;

  @ApiPropertyOptional({
    description: CommentPropertyDescription.Limit,
    example: CommentPagination.DefaultLimit,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(CommentPagination.MaxLimit)
  public limit: number = CommentPagination.DefaultLimit;
}
