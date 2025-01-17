import { Injectable } from '@nestjs/common';
import { CreateSuitUltimateLevelInfoDto } from './dto/create-suit_ultimate_level_info.dto';
import { UpdateSuitUltimateLevelInfoDto } from './dto/update-suit_ultimate_level_info.dto';

@Injectable()
export class SuitUltimateLevelInfoService {
  create(createSuitUltimateLevelInfoDto: CreateSuitUltimateLevelInfoDto) {
    return 'This action adds a new suitUltimateLevelInfo';
  }

  findAll() {
    return `This action returns all suitUltimateLevelInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suitUltimateLevelInfo`;
  }

  update(id: number, updateSuitUltimateLevelInfoDto: UpdateSuitUltimateLevelInfoDto) {
    return `This action updates a #${id} suitUltimateLevelInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} suitUltimateLevelInfo`;
  }
}
