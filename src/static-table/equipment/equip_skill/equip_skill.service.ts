import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { EquipSkill } from './entities/equip_skill.entity';

@Injectable()
export class EquipSkillService {
  constructor(
    @InjectRepository(EquipSkill)
    private readonly equipSkillRepository: Repository<EquipSkill>,
  ) {}

  getEquipSkillRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<EquipSkill>(EquipSkill)
      : this.equipSkillRepository;
  }

  async getEquipSkillAll(qr?: QueryRunner) {
    const equipSkillRepository = this.getEquipSkillRepository(qr);
    const result = await equipSkillRepository.find({});
    return result;
  }

  async getEquipSkill(id: number, qr?: QueryRunner) {
    // const eduRepository = this.getEduRepository(qr);
    // const result = await eduRepository.findOne({
    //   where: {
    //     id,
    //   },
    // });
    // return result;
  }
}
