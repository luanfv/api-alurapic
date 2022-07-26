import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public create(@Body() user: User): User {
    return this.userService.create(user);
  }

  @Get(':name')
  public getByName(@Param('name') name: string) {
    const userFound = this.userService.getByName(name);

    return userFound;
  }
}

export { UserController };
