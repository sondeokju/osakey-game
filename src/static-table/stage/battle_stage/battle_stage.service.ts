import { Injectable } from '@nestjs/common';
import { CreateBattleStageDto } from './dto/create-battle_stage.dto';
import { UpdateBattleStageDto } from './dto/update-battle_stage.dto';

@Injectable()
export class BattleStageService {
  create(createBattleStageDto: CreateBattleStageDto) {
    return 'This action adds a new battleStage';
  }

  findAll() {
    return `This action returns all battleStage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} battleStage`;
  }

  update(id: number, updateBattleStageDto: UpdateBattleStageDto) {
    return `This action updates a #${id} battleStage`;
  }

  remove(id: number) {
    return `This action removes a #${id} battleStage`;
  }
}
