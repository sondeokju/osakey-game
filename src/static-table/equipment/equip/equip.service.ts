import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Equip } from './entities/equip.entity';

@Injectable()
export class EquipService {
  constructor(
    @InjectRepository(Equip)
    private readonly equipRepository: Repository<Equip>,
  ) {}

  getEquipRepository(qr?: QueryRunner) {
    return qr ? qr.manager.getRepository<Equip>(Equip) : this.equipRepository;
  }

  async getEquipAll(qr?: QueryRunner) {
    const equipRepository = this.getEquipRepository(qr);
    const result = await equipRepository.find({});
    return result;
  }

  async getEquip(id: number, qr?: QueryRunner) {
    // const eduRepository = this.getEduRepository(qr);
    // const result = await eduRepository.findOne({
    //   where: {
    //     id,
    //   },
    // });
    // return result;
  }
}
