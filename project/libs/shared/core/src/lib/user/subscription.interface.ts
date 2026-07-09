import type { EntityId, Timestamps } from '../common';

export interface Subscription extends Timestamps {
  id?: EntityId;
  subscriberId: EntityId;
  authorId: EntityId;
}
