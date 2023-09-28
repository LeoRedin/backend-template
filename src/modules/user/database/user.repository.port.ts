import {
  PaginatedQueryParams,
  RepositoryPort,
} from '@src/libs/db/repository.port';
import { UserEntity } from '../domain/user.entity';

export interface FindUsersParams extends PaginatedQueryParams {}

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findOneByEmail(email: string): Promise<UserEntity | null>;
}
