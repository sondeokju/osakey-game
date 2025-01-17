import { Injectable } from '@nestjs/common';
import { CreateSuitOptionDto } from './dto/create-suit_option.dto';
import { UpdateSuitOptionDto } from './dto/update-suit_option.dto';

@Injectable()
export class SuitOptionService {
  create(createSuitOptionDto: CreateSuitOptionDto) {
    return 'This action adds a new suitOption';
  }

  findAll() {
    return `This action returns all suitOption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suitOption`;
  }

  update(id: number, updateSuitOptionDto: UpdateSuitOptionDto) {
    return `This action updates a #${id} suitOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} suitOption`;
  }
}
