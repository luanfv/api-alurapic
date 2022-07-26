import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public create(@Body() user) {
    return this.userService.create(user);
  }
}

export { UserController };
