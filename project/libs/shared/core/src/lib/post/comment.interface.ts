import type { EntityId, Timestamps } from '../common';

export interface Comment extends Timestamps {
  id?: EntityId;
  postId: EntityId;
  authorId: EntityId;
  text: string;
}
