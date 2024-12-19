import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { EquipOption } from './entities/equip_option.entity';

@Injectable()
export class EquipOptionService {
  constructor(
    @InjectRepository(EquipOption)
    private readonly equipOptionRepository: Repository<EquipOption>,
  ) {}

  getEquipOptionRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<EquipOption>(EquipOption)
      : this.equipOptionRepository;
  }

  async getEquipOptionAll(qr?: QueryRunner) {
    const equipOptionRepository = this.getEquipOptionRepository(qr);
    const result = await equipOptionRepository.find({});
    return result;
  }

  async getEquipOption(
    origin_equip_id: number,
    option_grade: number,
    qr?: QueryRunner,
  ) {
    const equipOptionRepository = this.getEquipOptionRepository(qr);
    const result = await equipOptionRepository.findOne({
      where: {
        origin_equip_id,
        option_grade,
      },
    });
    return result;
  }
}
