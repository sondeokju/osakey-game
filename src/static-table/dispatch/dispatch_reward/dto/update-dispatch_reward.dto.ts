import { PartialType } from '@nestjs/mapped-types';
import { CreateDispatchRewardDto } from './create-dispatch_reward.dto';

export class UpdateDispatchRewardDto extends PartialType(CreateDispatchRewardDto) {}
