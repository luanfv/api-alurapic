import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class User {
  id: number;

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
