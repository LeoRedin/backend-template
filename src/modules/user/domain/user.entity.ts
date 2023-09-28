import { v4 } from 'uuid';
import { AggregateID, Entity } from '@src/libs/domain';

import { CreateUserProps, UserProps } from './user.types';

export class UserEntity extends Entity<UserProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateUserProps): UserEntity {
    const id = v4();

    const user = new UserEntity({ id, props: create });

    return user;
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
