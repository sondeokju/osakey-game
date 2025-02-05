import { PartialType } from '@nestjs/mapped-types';
import { CreateUserGachaCheckDto } from './create-user_gacha_check.dto';

export class UpdateUserGachaCheckDto extends PartialType(CreateUserGachaCheckDto) {}
