import { PartialType } from '@nestjs/mapped-types';
import { CreateUserIngameRewardDto } from './create-user_ingame_reward.dto';

export class UpdateUserIngameRewardDto extends PartialType(CreateUserIngameRewardDto) {}
