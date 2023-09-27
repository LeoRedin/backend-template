import { Module } from '@nestjs/common';
import { SlonikModule } from 'nestjs-slonik';
import { RequestContextModule } from 'nestjs-request-context';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from '@modules/user/user.module';
import { postgresConnectionUri } from './configs/database.config';
import { ContextInterceptor } from './libs/application/context/ContextInterceptor';
import { ExceptionInterceptor } from './libs/application/interceptors/exception.interceptor';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

@Module({
  imports: [
    RequestContextModule,
    SlonikModule.forRoot({
      connectionUri: postgresConnectionUri,
    }),

    // Modules
    UserModule,
  ],
  controllers: [],
  providers: [...interceptors],
})
export class AppModule {}
