import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBattlePassDto } from './create-user_battle_pass.dto';

export class UpdateUserBattlePassDto extends PartialType(CreateUserBattlePassDto) {}
