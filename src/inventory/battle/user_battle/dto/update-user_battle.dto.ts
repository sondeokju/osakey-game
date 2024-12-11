import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBattleDto } from './create-user_battle.dto';

export class UpdateUserBattleDto extends PartialType(CreateUserBattleDto) {}
