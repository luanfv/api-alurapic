import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { isNameUnique } from './is-name-unique.validator';

class User {
  id: number;

  @Expose({
    name: 'username', // externamente na API vai ser chamado de "username", mas dentro da aplicação vai ser "name"
  })
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

  @Exclude({
    toPlainOnly: true, // Não vai retornar o password nos retornos, mas vai continuar exigindo receber
  })
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
