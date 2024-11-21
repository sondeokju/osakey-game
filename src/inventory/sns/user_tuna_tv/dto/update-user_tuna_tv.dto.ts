import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTunaTvDto } from './create-user_tuna_tv.dto';

export class UpdateUserTunaTvDto extends PartialType(CreateUserTunaTvDto) {}
