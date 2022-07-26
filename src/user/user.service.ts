import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
class UserService {
  private users: User[] = [];

  public create(user: User): User {
    this.users.push(user);

    return user;
  }

  public getByName(name: string): User {
    const userFound = this.users.find((user) => user.name === name);

    return userFound;
  }
}

export { UserService };
