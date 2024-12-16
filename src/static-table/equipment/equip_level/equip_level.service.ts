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

  async getEquipLevel(id: number, qr?: QueryRunner) {
    // const eduRepository = this.getEduRepository(qr);
    // const result = await eduRepository.findOne({
    //   where: {
    //     id,
    //   },
    // });
    // return result;
  }
}
