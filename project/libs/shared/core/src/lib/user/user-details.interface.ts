import type { EntityId } from '../common';

export interface UserDetails {
  id: EntityId;
  registeredAt: Date;
  postsCount: number;
  followersCount: number;
}
