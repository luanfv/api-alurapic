import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { isNameUnique } from './is-name-unique.validator';

class User {
  id: number;

  @isNameUnique({
    message: 'Nome do usuário precisa ser unico!',
  })
  @IsNotEmpty({
    message: 'É necessario informar o nome!',
  })
  @IsString()
  name: string;

  @IsEmail(
    {},
    {
      message: 'E-mail inválido!',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'É necessario informar uma senha!',
  })
  password: string;

  @IsNotEmpty({
    message: 'É necessario informar o nome completo!',
  })
  fullName: string;

  createdAt: string;
}

export { User };
