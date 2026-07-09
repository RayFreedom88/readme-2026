import { hash, genSalt, compare } from 'bcrypt';

import { Entity } from '@project/core';
import { StorableEntity, AuthUser } from '@project/core';

const SALT_ROUNDS = 10;

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email = '';
  public firstname = '';
  public lastname = '';
  public avatarId?: string;
  public createdAt = new Date();
  public passwordHash = '';

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.avatarId = user.avatarId;
    this.createdAt = user.createdAt;
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      avatarId: this.avatarId,
      createdAt: this.createdAt,
      passwordHash: this.passwordHash,
    };
  }

  public async setPassword(plainPassword: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(plainPassword, salt);

    return this;
  }
  public async comparePassword(plainPassword: string): Promise<boolean> {
    return compare(plainPassword, this.passwordHash);
  }
}
