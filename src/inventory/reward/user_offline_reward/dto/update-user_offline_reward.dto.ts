import { PartialType } from '@nestjs/mapped-types';
import { CreateUserOfflineRewardDto } from './create-user_offline_reward.dto';

export class UpdateUserOfflineRewardDto extends PartialType(CreateUserOfflineRewardDto) {}
