import { Injectable } from '@nestjs/common';
import { CreatePassEduDto } from './dto/create-pass_edu.dto';
import { UpdatePassEduDto } from './dto/update-pass_edu.dto';

@Injectable()
export class PassEduService {
  create(createPassEduDto: CreatePassEduDto) {
    return 'This action adds a new passEdu';
  }

  findAll() {
    return `This action returns all passEdu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passEdu`;
  }

  update(id: number, updatePassEduDto: UpdatePassEduDto) {
    return `This action updates a #${id} passEdu`;
  }

  remove(id: number) {
    return `This action removes a #${id} passEdu`;
  }
}
