import { Injectable } from '@nestjs/common';

@Injectable()
class UserService {
  public create(user) {
    return user;
  }
}

export { UserService };
