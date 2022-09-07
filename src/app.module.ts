import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { UserModule } from './user/user.module';
import { FilterExecptionHttp } from './commom/filters/filter-execption-http.filter';
import { TransformResponseInterceptor } from './core/http/transform-response.interceptor';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: FilterExecptionHttp,
    },
  ],
})
class AppModule {}

export { AppModule };
