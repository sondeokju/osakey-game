import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSnsRewardDto } from './create-user_sns_reward.dto';

export class UpdateUserSnsRewardDto extends PartialType(CreateUserSnsRewardDto) {}
