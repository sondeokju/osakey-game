import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { GachaOutput } from './entities/gacha_output.entity';

@Injectable()
export class GachaOutputService {
  constructor(
    @InjectRepository(GachaOutput)
    private readonly gachaOutputRepository: Repository<GachaOutput>,
  ) {}

  getGachaOutputRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<GachaOutput>(GachaOutput)
      : this.gachaOutputRepository;
  }

  async getGachaOutputAll(qr?: QueryRunner) {
    const gachaOutputRepository = this.getGachaOutputRepository(qr);
    const result = await gachaOutputRepository.find({});
    return result;
  }

  async getGachaOutputList(gacha_id: number, qr?: QueryRunner) {
    const gachaOutputRepository = this.getGachaOutputRepository(qr);
    const result = await gachaOutputRepository.find({
      where: {
        gacha_id,
      },
    });

    return result;
  }
}
