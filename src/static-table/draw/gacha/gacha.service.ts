import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Gacha } from './entities/gacha.entity';

@Injectable()
export class GachaService {
  constructor(
    @InjectRepository(Gacha)
    private readonly gachaRepository: Repository<Gacha>,
  ) {}

  getGachaRepository(qr?: QueryRunner) {
    return qr ? qr.manager.getRepository<Gacha>(Gacha) : this.gachaRepository;
  }

  async getGachaAll(qr?: QueryRunner) {
    const gachaRepository = this.getGachaRepository(qr);
    const result = await gachaRepository.find({});
    return result;
  }

  async getGacha(gacha_id: number, qr?: QueryRunner) {
    const gachaRepository = this.getGachaRepository(qr);
    const result = await gachaRepository.findOne({
      where: {
        gacha_id,
      },
    });

    return result;
  }
}
