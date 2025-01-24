import { Injectable } from '@nestjs/common';
import { CreateSuitUltimateDto } from './dto/create-suit_ultimate.dto';
import { UpdateSuitUltimateDto } from './dto/update-suit_ultimate.dto';

@Injectable()
export class SuitUltimateService {
  create(createSuitUltimateDto: CreateSuitUltimateDto) {
    return 'This action adds a new suitUltimate';
  }

  findAll() {
    return `This action returns all suitUltimate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suitUltimate`;
  }

  update(id: number, updateSuitUltimateDto: UpdateSuitUltimateDto) {
    return `This action updates a #${id} suitUltimate`;
  }

  remove(id: number) {
    return `This action removes a #${id} suitUltimate`;
  }
}
