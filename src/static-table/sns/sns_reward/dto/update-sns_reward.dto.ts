import { PartialType } from '@nestjs/mapped-types';
import { CreateSnsRewardDto } from './create-sns_reward.dto';

export class UpdateSnsRewardDto extends PartialType(CreateSnsRewardDto) {}
