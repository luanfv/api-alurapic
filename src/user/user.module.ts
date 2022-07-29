import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IsNameUniqueConstrait } from './is-name-unique.validator';
@Module({
  controllers: [UserController],
  providers: [UserService, IsNameUniqueConstrait],
})
class UserModule {}

export { UserModule };
