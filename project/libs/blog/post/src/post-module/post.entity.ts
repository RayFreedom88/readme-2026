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

  // TODO: разделить сущность по подтипам (Video/Text/Quote/Photo/Link), когда появится строгая валидация DTO.
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

    Object.assign(this, post);
    this.id = post.id ?? '';
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
