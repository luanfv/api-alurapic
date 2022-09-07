import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from './user.service';

@Injectable()
@ValidatorConstraint()
class IsNameUniqueConstrait implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  validate(name: string): boolean | Promise<boolean> {
    const userExists = this.userService.getByName(name);

    return !userExists;
  }
}

function isNameUnique(validationOpstions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOpstions,
      constraints: [],
      validator: IsNameUniqueConstrait,
    });
  };
}

export { isNameUnique, IsNameUniqueConstrait };
