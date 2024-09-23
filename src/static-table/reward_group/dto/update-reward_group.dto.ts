import { PartialType } from '@nestjs/mapped-types';
import { CreateRewardGroupDto } from './create-reward_group.dto';

export class UpdateRewardGroupDto extends PartialType(CreateRewardGroupDto) {}
