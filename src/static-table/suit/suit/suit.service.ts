import { Injectable } from '@nestjs/common';
import { CreateSuitDto } from './dto/create-suit.dto';
import { UpdateSuitDto } from './dto/update-suit.dto';

@Injectable()
export class SuitService {
  create(createSuitDto: CreateSuitDto) {
    return 'This action adds a new suit';
  }

  findAll() {
    return `This action returns all suit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suit`;
  }

  update(id: number, updateSuitDto: UpdateSuitDto) {
    return `This action updates a #${id} suit`;
  }

  remove(id: number) {
    return `This action removes a #${id} suit`;
  }
}
