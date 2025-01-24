import { PartialType } from '@nestjs/mapped-types';
import { CreateBattleStageDto } from './create-battle_stage.dto';

export class UpdateBattleStageDto extends PartialType(CreateBattleStageDto) {}
