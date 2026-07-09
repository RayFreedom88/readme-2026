import type { EntityId } from '../common';

export interface User {
  id?: EntityId;
  email: string;
  firstname: string;
  lastname: string;
  avatarId?: EntityId;
  createdAt: Date;
}
