import type { EntityId, Timestamps } from '../common';

export interface StoredFile extends Timestamps {
  id?: EntityId;
  originalName: string;
  subDirectory: string;
  path: string;
  mimetype: string;
  size: number;
}
