import { Injectable } from '@nestjs/common';
import { CreateSuitInfoDto } from './dto/create-suit_info.dto';
import { UpdateSuitInfoDto } from './dto/update-suit_info.dto';

@Injectable()
export class SuitInfoService {
  create(createSuitInfoDto: CreateSuitInfoDto) {
    return 'This action adds a new suitInfo';
  }

  findAll() {
    return `This action returns all suitInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suitInfo`;
  }

  update(id: number, updateSuitInfoDto: UpdateSuitInfoDto) {
    return `This action updates a #${id} suitInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} suitInfo`;
  }
}
