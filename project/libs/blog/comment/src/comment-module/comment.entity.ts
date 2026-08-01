import type { Comment, StorableEntity } from '@project/core';
import { Entity } from '@project/core';

export class CommentEntity extends Entity implements StorableEntity<Comment> {
  public postId = '';
  public authorId = '';
  public text = '';
  public createdAt: Date = new Date();

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment): void {
    if (!comment) {
      return;
    }

    this.id = comment.id ?? '';
    this.postId = comment.postId;
    this.authorId = comment.authorId;
    this.text = comment.text;
    this.createdAt = comment.createdAt;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      postId: this.postId,
      authorId: this.authorId,
      text: this.text,
      createdAt: this.createdAt,
    };
  }
}
