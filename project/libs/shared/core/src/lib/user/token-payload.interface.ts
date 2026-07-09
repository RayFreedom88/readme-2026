import type { EntityId } from '../common';

export interface TokenPayload {
  sub: EntityId;
  email: string;
  firstname: string;
  lastname: string;
}
