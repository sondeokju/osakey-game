import { Injectable } from '@nestjs/common';
import { CreateEquipGradeDto } from './dto/create-equip_grade.dto';
import { UpdateEquipGradeDto } from './dto/update-equip_grade.dto';

@Injectable()
export class EquipGradeService {
  create(createEquipGradeDto: CreateEquipGradeDto) {
    return 'This action adds a new equipGrade';
  }

  findAll() {
    return `This action returns all equipGrade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipGrade`;
  }

  update(id: number, updateEquipGradeDto: UpdateEquipGradeDto) {
    return `This action updates a #${id} equipGrade`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipGrade`;
  }
}
