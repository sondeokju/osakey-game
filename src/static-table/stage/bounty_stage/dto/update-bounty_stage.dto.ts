import { PartialType } from '@nestjs/mapped-types';
import { CreateBountyStageDto } from './create-bounty_stage.dto';

export class UpdateBountyStageDto extends PartialType(CreateBountyStageDto) {}
