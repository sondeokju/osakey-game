import { Injectable } from '@nestjs/common';
import { CreateEduReduceTimeDto } from './dto/create-edu_reduce_time.dto';
import { UpdateEduReduceTimeDto } from './dto/update-edu_reduce_time.dto';

@Injectable()
export class EduReduceTimeService {
  create(createEduReduceTimeDto: CreateEduReduceTimeDto) {
    return 'This action adds a new eduReduceTime';
  }

  findAll() {
    return `This action returns all eduReduceTime`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eduReduceTime`;
  }

  update(id: number, updateEduReduceTimeDto: UpdateEduReduceTimeDto) {
    return `This action updates a #${id} eduReduceTime`;
  }

  remove(id: number) {
    return `This action removes a #${id} eduReduceTime`;
  }
}
