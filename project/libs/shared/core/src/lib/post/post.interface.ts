import type { EntityId, Timestamps } from '../common';
import { PostType, type PostState } from './post-type.type';

export interface BasePost extends Timestamps {
  id?: EntityId;
  type: PostType;
  state: PostState;
  authorId: EntityId;
  tags: string[];
  publishedAt: Date;

  isRepost: boolean;
  originalAuthorId?: EntityId;
  originalPostId?: EntityId;

  likesCount: number;
  commentsCount: number;
}

export interface VideoPost extends BasePost {
  type: typeof PostType.Video;
  title: string;
  videoUrl: string;
}

export interface TextPost extends BasePost {
  type: typeof PostType.Text;
  title: string;
  announce: string;
  text: string;
}

export interface QuotePost extends BasePost {
  type: typeof PostType.Quote;
  text: string;
  quoteAuthor: string;
}

export interface PhotoPost extends BasePost {
  type: typeof PostType.Photo;
  photoId: EntityId;
}

export interface LinkPost extends BasePost {
  type: typeof PostType.Link;
  url: string;
  description?: string;
}

export type Post = VideoPost | TextPost | QuotePost | PhotoPost | LinkPost;
