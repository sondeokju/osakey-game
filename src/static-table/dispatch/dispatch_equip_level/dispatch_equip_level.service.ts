import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { DispatchEquipLevel } from './entities/dispatch_equip_level.entity';

@Injectable()
export class DispatchEquipLevelService {
  constructor(
    @InjectRepository(DispatchEquipLevel)
    private readonly dispatchEquipLevelRepository: Repository<DispatchEquipLevel>,
  ) {}

  getDispatchEquipLevelRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<DispatchEquipLevel>(DispatchEquipLevel)
      : this.dispatchEquipLevelRepository;
  }

  async getDispatchEquipLevelAll(qr?: QueryRunner) {
    const dispatchEquipLevelRepository =
      this.getDispatchEquipLevelRepository(qr);
    const result = await dispatchEquipLevelRepository.find({});
    return result;
  }

  async getDispatchEquipLevel(equip_level: number, qr?: QueryRunner) {
    const dispatchEquipLevelRepository =
      this.getDispatchEquipLevelRepository(qr);
    const result = await dispatchEquipLevelRepository.findOne({
      where: {
        equip_level,
      },
    });

    return result;
  }
}
