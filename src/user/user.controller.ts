import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { NestResponse } from '../core/http/nest-response';

import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public create(@Body() user: User): NestResponse {
    const createdUser = this.userService.create(user);

    const response = new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        location: `/users/${createdUser.fullName}`,
      })
      .withBody(createdUser)
      .build();

    return response;
  }

  @Get(':name')
  public getByName(@Param('name') name: string): NestResponse {
    const userFound = this.userService.getByName(name);

    const status = userFound ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    const header = { location: `/users/${name}` };
    const body = userFound ? userFound : { message: 'Usuário não encontrado' };

    const response = new NestResponseBuilder()
      .withStatus(status)
      .withHeaders(header)
      .withBody(body)
      .build();

    return response;
  }
}

export { UserController };
