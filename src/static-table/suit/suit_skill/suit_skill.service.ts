import { Injectable } from '@nestjs/common';
import { CreateSuitSkillDto } from './dto/create-suit_skill.dto';
import { UpdateSuitSkillDto } from './dto/update-suit_skill.dto';

@Injectable()
export class SuitSkillService {
  create(createSuitSkillDto: CreateSuitSkillDto) {
    return 'This action adds a new suitSkill';
  }

  findAll() {
    return `This action returns all suitSkill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suitSkill`;
  }

  update(id: number, updateSuitSkillDto: UpdateSuitSkillDto) {
    return `This action updates a #${id} suitSkill`;
  }

  remove(id: number) {
    return `This action removes a #${id} suitSkill`;
  }
}
