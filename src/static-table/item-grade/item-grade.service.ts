import { Injectable } from '@nestjs/common';
import { CreateItemGradeDto } from './dto/create-item-grade.dto';
import { UpdateItemGradeDto } from './dto/update-item-grade.dto';

@Injectable()
export class ItemGradeService {
  create(createItemGradeDto: CreateItemGradeDto) {
    return 'This action adds a new itemGrade';
  }

  findAll() {
    return `This action returns all itemGrade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemGrade`;
  }

  update(id: number, updateItemGradeDto: UpdateItemGradeDto) {
    return `This action updates a #${id} itemGrade`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemGrade`;
  }
}
