import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTunaTvOnlineDto } from './create-user-tuna-tv-online.dto';

export class UpdateUserTunaTvOnlineDto extends PartialType(CreateUserTunaTvOnlineDto) {}
