import { Injectable } from '@nestjs/common';
import { CreateEduDto } from './dto/create-edu.dto';
import { UpdateEduDto } from './dto/update-edu.dto';

@Injectable()
export class EduService {
  create(createEduDto: CreateEduDto) {
    return 'This action adds a new edu';
  }

  findAll() {
    return `This action returns all edu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} edu`;
  }

  update(id: number, updateEduDto: UpdateEduDto) {
    return `This action updates a #${id} edu`;
  }

  remove(id: number) {
    return `This action removes a #${id} edu`;
  }
}
