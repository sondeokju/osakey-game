import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { GachaSell } from './entities/gacha_sell.entity';

@Injectable()
export class GachaSellService {
  constructor(
    @InjectRepository(GachaSell)
    private readonly gachaSellRepository: Repository<GachaSell>,
  ) {}

  getGachaSellRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<GachaSell>(GachaSell)
      : this.gachaSellRepository;
  }

  async getGachaSellAll(qr?: QueryRunner) {
    const gachaSellRepository = this.getGachaSellRepository(qr);
    const result = await gachaSellRepository.find({});
    return result;
  }

  async getGachaSell(gacha_id: number, qr?: QueryRunner) {
    const gachaSellRepository = this.getGachaSellRepository(qr);
    const result = await gachaSellRepository.findOne({
      where: {
        gacha_id,
      },
    });

    return result;
  }
}
