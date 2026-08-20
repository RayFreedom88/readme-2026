import { PostState, PostType } from './post-type.type';
import type { Tag } from './tag.interface';

import type { EntityId, Timestamps } from '../common';

export interface BasePost extends Timestamps {
  id?: EntityId;
  type: PostType;
  state: PostState;
  authorId: EntityId;
  tags: Tag[];
  publishedAt: Date;

  isRepost: boolean;
  originalAuthorId?: EntityId;
  originalPostId?: EntityId;

  likesCount: number;
  commentsCount: number;
}

export interface VideoPost extends BasePost {
  type: PostType.Video;
  title: string;
  videoUrl: string;
}

export interface TextPost extends BasePost {
  type: PostType.Text;
  title: string;
  announce: string;
  text: string;
}

export interface QuotePost extends BasePost {
  type: PostType.Quote;
  text: string;
  quoteAuthor: string;
}

export interface PhotoPost extends BasePost {
  type: PostType.Photo;
  photoId: EntityId;
}

export interface LinkPost extends BasePost {
  type: PostType.Link;
  url: string;
  description?: string;
}

export type Post = VideoPost | TextPost | QuotePost | PhotoPost | LinkPost;
