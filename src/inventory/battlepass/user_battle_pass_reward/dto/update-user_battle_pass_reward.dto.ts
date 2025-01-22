import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBattlePassRewardDto } from './create-user_battle_pass_reward.dto';

export class UpdateUserBattlePassRewardDto extends PartialType(CreateUserBattlePassRewardDto) {}
