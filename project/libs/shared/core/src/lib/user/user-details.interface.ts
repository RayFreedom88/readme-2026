import type { EntityId } from '../common';

export interface UserDetails {
  id: EntityId;
  createdAt: Date;
  postsCount: number;
  followersCount: number;
}
