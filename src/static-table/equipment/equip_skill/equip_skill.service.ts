import { Injectable } from '@nestjs/common';
import { CreateEquipSkillDto } from './dto/create-equip_skill.dto';
import { UpdateEquipSkillDto } from './dto/update-equip_skill.dto';

@Injectable()
export class EquipSkillService {
  create(createEquipSkillDto: CreateEquipSkillDto) {
    return 'This action adds a new equipSkill';
  }

  findAll() {
    return `This action returns all equipSkill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipSkill`;
  }

  update(id: number, updateEquipSkillDto: UpdateEquipSkillDto) {
    return `This action updates a #${id} equipSkill`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipSkill`;
  }
}
