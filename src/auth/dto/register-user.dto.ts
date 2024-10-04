import { PickType } from '@nestjs/mapped-types';
import { Users } from 'src/users/entity/users.entity';

export class RegisterUserDto extends PickType(Users, [
  'nickname',
  'email',
  'password',
]) {}
