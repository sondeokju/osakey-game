import { Injectable } from '@nestjs/common';
import { CreateEduListDto } from './dto/create-edu_list.dto';
import { UpdateEduListDto } from './dto/update-edu_list.dto';

@Injectable()
export class EduListService {
  create(createEduListDto: CreateEduListDto) {
    return 'This action adds a new eduList';
  }

  findAll() {
    return `This action returns all eduList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eduList`;
  }

  update(id: number, updateEduListDto: UpdateEduListDto) {
    return `This action updates a #${id} eduList`;
  }

  remove(id: number) {
    return `This action removes a #${id} eduList`;
  }
}
