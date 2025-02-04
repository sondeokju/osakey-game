import { PartialType } from '@nestjs/mapped-types';
import { CreateTutorialRewardDto } from './create-tutorial_reward.dto';

export class UpdateTutorialRewardDto extends PartialType(CreateTutorialRewardDto) {}
