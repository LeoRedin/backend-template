import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result } from 'oxide.ts';
import { ResponseBase } from '@src/libs/api/response.base';
import { routesV1 } from '@src/configs/app.routes';
import { PaginatedQueryRequestDto } from '@src/libs/api/paginated-query.request.dto';
import { Paginated } from '@src/libs/db/repository.port';
import { UserModel } from '../../database/user.repository';
import { UserPaginatedResponseDto } from '../../dtos/user.paginated.response.dto';
import { FindUsersQuery } from './find-users.query-handler';

@Controller(routesV1.version)
export class FindUsersHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.user.root)
  @ApiOperation({ summary: 'Find users' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserPaginatedResponseDto,
  })
  async findUsers(
    @Query() queryParams: PaginatedQueryRequestDto,
  ): Promise<UserPaginatedResponseDto> {
    const query = new FindUsersQuery({
      limit: queryParams?.limit,
      page: queryParams?.page,
    });
    const result: Result<
      Paginated<UserModel>,
      Error
    > = await this.queryBus.execute(query);

    const paginated = result.unwrap();

    // Whitelisting returned properties
    return new UserPaginatedResponseDto({
      ...paginated,
      data: paginated.data.map((user) => ({
        ...new ResponseBase(user),
        email: user.email,
      })),
    });
  }
}
