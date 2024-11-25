import { Injectable } from '@nestjs/common';
import { CreateDispatchEquipGradeDto } from './dto/create-dispatch_equip_grade.dto';
import { UpdateDispatchEquipGradeDto } from './dto/update-dispatch_equip_grade.dto';

@Injectable()
export class DispatchEquipGradeService {
  create(createDispatchEquipGradeDto: CreateDispatchEquipGradeDto) {
    return 'This action adds a new dispatchEquipGrade';
  }

  findAll() {
    return `This action returns all dispatchEquipGrade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dispatchEquipGrade`;
  }

  update(id: number, updateDispatchEquipGradeDto: UpdateDispatchEquipGradeDto) {
    return `This action updates a #${id} dispatchEquipGrade`;
  }

  remove(id: number) {
    return `This action removes a #${id} dispatchEquipGrade`;
  }
}
