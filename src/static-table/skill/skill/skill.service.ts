import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  getSkillRepository(qr?: QueryRunner) {
    return qr ? qr.manager.getRepository<Skill>(Skill) : this.skillRepository;
  }

  async getSkillAll(qr?: QueryRunner) {
    const skillRepository = this.getSkillRepository(qr);
    const result = await skillRepository.find({});
    return result;
  }

  async getSkill(skill_id: number, qr?: QueryRunner) {
    const skillRepository = this.getSkillRepository(qr);
    const result = await skillRepository.findOne({
      where: {
        skill_id,
      },
    });

    return result;
  }

  async getSkillCategory(skill_equip_category: string, qr?: QueryRunner) {
    const skillRepository = this.getSkillRepository(qr);
    const result = await skillRepository.find({
      where: {
        skill_equip_category: skill_equip_category.trim(),
      },
    });

    return result;
  }
}
