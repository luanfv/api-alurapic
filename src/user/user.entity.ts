import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity } from 'typeorm';

import { isNameUnique } from './is-name-unique.validator';

@Entity('Users')
class User {
  @Column({
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: number;

  @Column({
    name: 'username',
    unique: true,
    nullable: false,
    type: 'varchar',
  })
  @isNameUnique({
    message: 'Nome do usuário precisa ser unico!',
  })
  @IsNotEmpty({
    message: 'É necessario informar o nome!',
  })
  @IsString()
  username: string;

  @Column({
    name: 'email',
    nullable: false,
    type: 'varchar',
  })
  @IsEmail(
    {},
    {
      message: 'E-mail inválido!',
    },
  )
  email: string;

  @Column({
    name: 'password',
    nullable: false,
    type: 'varchar',
  })
  @Exclude({
    toPlainOnly: true, // Não vai retornar o password nos retornos, mas vai continuar exigindo receber
  })
  @IsNotEmpty({
    message: 'É necessario informar uma senha!',
  })
  password: string;

  @Column({
    name: 'fullName',
    nullable: false,
    type: 'varchar',
  })
  @IsNotEmpty({
    message: 'É necessario informar o nome completo!',
  })
  fullName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
}

export { User };
