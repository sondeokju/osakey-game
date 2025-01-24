import { Injectable } from '@nestjs/common';
import { CreateSuitUltimateLevelDto } from './dto/create-suit_ultimate_level.dto';
import { UpdateSuitUltimateLevelDto } from './dto/update-suit_ultimate_level.dto';

@Injectable()
export class SuitUltimateLevelService {
  create(createSuitUltimateLevelDto: CreateSuitUltimateLevelDto) {
    return 'This action adds a new suitUltimateLevel';
  }

  findAll() {
    return `This action returns all suitUltimateLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suitUltimateLevel`;
  }

  update(id: number, updateSuitUltimateLevelDto: UpdateSuitUltimateLevelDto) {
    return `This action updates a #${id} suitUltimateLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} suitUltimateLevel`;
  }
}
