import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { EquipLevel } from './entities/equip_level.entity';

@Injectable()
export class EquipLevelService {
  constructor(
    @InjectRepository(EquipLevel)
    private readonly equipLevelRepository: Repository<EquipLevel>,
  ) {}

  getEquipLevelRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<EquipLevel>(EquipLevel)
      : this.equipLevelRepository;
  }

  async getEquipLevelAll(qr?: QueryRunner) {
    const equipLevelRepository = this.getEquipLevelRepository(qr);
    const result = await equipLevelRepository.find({});
    return result;
  }

  async getEquipLevel(equip_level_id: number, qr?: QueryRunner) {
    const equipLevelRepository = this.getEquipLevelRepository(qr);
    const result = await equipLevelRepository.findOne({
      where: {
        equip_level_id,
      },
    });
    return result;
  }
}
