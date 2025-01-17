import { Injectable } from '@nestjs/common';
import { CreateSuitUltimateInfoDto } from './dto/create-suit_ultimate_info.dto';
import { UpdateSuitUltimateInfoDto } from './dto/update-suit_ultimate_info.dto';

@Injectable()
export class SuitUltimateInfoService {
  create(createSuitUltimateInfoDto: CreateSuitUltimateInfoDto) {
    return 'This action adds a new suitUltimateInfo';
  }

  findAll() {
    return `This action returns all suitUltimateInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suitUltimateInfo`;
  }

  update(id: number, updateSuitUltimateInfoDto: UpdateSuitUltimateInfoDto) {
    return `This action updates a #${id} suitUltimateInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} suitUltimateInfo`;
  }
}
