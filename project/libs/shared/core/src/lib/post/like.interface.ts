import type { EntityId, Timestamps } from '../common';

export interface Like extends Timestamps {
  id?: EntityId;
  postId: EntityId;
  userId: EntityId;
}
