import { Injectable } from '@nestjs/common';
import { CreateSuitLevelDto } from './dto/create-suit_level.dto';
import { UpdateSuitLevelDto } from './dto/update-suit_level.dto';

@Injectable()
export class SuitLevelService {
  create(createSuitLevelDto: CreateSuitLevelDto) {
    return 'This action adds a new suitLevel';
  }

  findAll() {
    return `This action returns all suitLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suitLevel`;
  }

  update(id: number, updateSuitLevelDto: UpdateSuitLevelDto) {
    return `This action updates a #${id} suitLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} suitLevel`;
  }
}
