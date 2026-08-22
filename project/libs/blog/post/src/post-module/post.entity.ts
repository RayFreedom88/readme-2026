import type { EntityId, Post, StorableEntity, Tag } from '@project/core';
import { Entity, PostState, PostType } from '@project/core';

export class PostEntity extends Entity implements StorableEntity<Post> {
  public type: PostType = PostType.Text;
  public state: PostState = PostState.Published;
  public authorId = '';
  public tags: Tag[] = [];
  public publishedAt: Date = new Date();

  public isRepost = false;
  public originalAuthorId?: EntityId;
  public originalPostId?: EntityId;

  public likesCount = 0;
  public commentsCount = 0;
  public createdAt: Date = new Date();

  public title?: string;
  public announce?: string;
  public text?: string;
  public videoUrl?: string;
  public photoId?: EntityId;
  public url?: string;
  public description?: string;
  public quoteAuthor?: string;

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? '';
    this.type = post.type;
    this.state = post.state;
    this.authorId = post.authorId;
    this.tags = post.tags ?? [];
    this.publishedAt = post.publishedAt;
    this.isRepost = post.isRepost;
    this.originalAuthorId = post.originalAuthorId;
    this.originalPostId = post.originalPostId;
    this.likesCount = post.likesCount;
    this.commentsCount = post.commentsCount;
    this.createdAt = post.createdAt;

    this.title = undefined;
    this.announce = undefined;
    this.text = undefined;
    this.videoUrl = undefined;
    this.photoId = undefined;
    this.url = undefined;
    this.description = undefined;
    this.quoteAuthor = undefined;

    switch (post.type) {
      case PostType.Video:
        this.title = post.title;
        this.videoUrl = post.videoUrl;
        break;
      case PostType.Text:
        this.title = post.title;
        this.announce = post.announce;
        this.text = post.text;
        break;
      case PostType.Quote:
        this.text = post.text;
        this.quoteAuthor = post.quoteAuthor;
        break;
      case PostType.Photo:
        this.photoId = post.photoId;
        break;
      case PostType.Link:
        this.url = post.url;
        this.description = post.description;
        break;
      default: {
        const exhaustive: never = post;
        throw new Error(`Unknown post type: ${exhaustive}`);
      }
    }
  }

  public toPOJO(): Post {
    const base = {
      id: this.id,
      state: this.state,
      authorId: this.authorId,
      tags: this.tags,
      publishedAt: this.publishedAt,
      isRepost: this.isRepost,
      originalAuthorId: this.originalAuthorId,
      originalPostId: this.originalPostId,
      likesCount: this.likesCount,
      commentsCount: this.commentsCount,
      createdAt: this.createdAt,
    };

    switch (this.type) {
      case PostType.Video:
        return {
          ...base,
          type: PostType.Video,
          title: this.title ?? '',
          videoUrl: this.videoUrl ?? '',
        };

      case PostType.Text:
        return {
          ...base,
          type: PostType.Text,
          title: this.title ?? '',
          announce: this.announce ?? '',
          text: this.text ?? '',
        };

      case PostType.Quote:
        return {
          ...base,
          type: PostType.Quote,
          text: this.text ?? '',
          quoteAuthor: this.quoteAuthor ?? '',
        };

      case PostType.Photo:
        return {
          ...base,
          type: PostType.Photo,
          photoId: this.photoId ?? '',
        };

      case PostType.Link:
        return {
          ...base,
          type: PostType.Link,
          url: this.url ?? '',
          description: this.description,
        };

      default: {
        const exhaustive: never = this.type;
        throw new Error(`Unknown post type: ${exhaustive}`);
      }
    }
  }
}
