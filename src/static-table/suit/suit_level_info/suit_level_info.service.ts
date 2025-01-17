import { Injectable } from '@nestjs/common';
import { CreateSuitLevelInfoDto } from './dto/create-suit_level_info.dto';
import { UpdateSuitLevelInfoDto } from './dto/update-suit_level_info.dto';

@Injectable()
export class SuitLevelInfoService {
  create(createSuitLevelInfoDto: CreateSuitLevelInfoDto) {
    return 'This action adds a new suitLevelInfo';
  }

  findAll() {
    return `This action returns all suitLevelInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suitLevelInfo`;
  }

  update(id: number, updateSuitLevelInfoDto: UpdateSuitLevelInfoDto) {
    return `This action updates a #${id} suitLevelInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} suitLevelInfo`;
  }
}
