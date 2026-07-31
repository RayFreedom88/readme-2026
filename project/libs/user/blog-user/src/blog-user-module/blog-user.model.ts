import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AuthUser } from '@project/core';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class BlogUserModel extends Document implements AuthUser {
  @Prop()
  public avatarId?: string;

  @Prop({
    required: true,
  })
  public createdAt!: Date;

  @Prop({
    required: true,
    unique: true,
  })
  public email!: string;

  @Prop({
    required: true,
  })
  public firstname!: string;

  @Prop({
    required: true,
  })
  public lastname!: string;

  @Prop({
    required: true,
  })
  public passwordHash!: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
