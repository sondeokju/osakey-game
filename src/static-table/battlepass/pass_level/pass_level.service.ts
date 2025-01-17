import { Injectable } from '@nestjs/common';
import { CreatePassLevelDto } from './dto/create-pass_level.dto';
import { UpdatePassLevelDto } from './dto/update-pass_level.dto';

@Injectable()
export class PassLevelService {
  create(createPassLevelDto: CreatePassLevelDto) {
    return 'This action adds a new passLevel';
  }

  findAll() {
    return `This action returns all passLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passLevel`;
  }

  update(id: number, updatePassLevelDto: UpdatePassLevelDto) {
    return `This action updates a #${id} passLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} passLevel`;
  }
}
