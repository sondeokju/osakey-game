import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Hero } from './entities/hero.entity';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
  ) {}

  getMissionMainRepository(qr?: QueryRunner) {
    return qr ? qr.manager.getRepository<Hero>(Hero) : this.heroRepository;
  }

  async getHeroAll(qr?: QueryRunner) {
    const heroRepository = this.getMissionMainRepository(qr);
    const result = await heroRepository.find({});
    return result;
  }

  async getHeroLevel(level: number, qr?: QueryRunner) {
    const heroRepository = this.getMissionMainRepository(qr);
    const result = await heroRepository.findOne({
      where: {
        level,
      },
    });
    return result;
  }

  async getHeroRankByExp(exp: number, qr?: QueryRunner) {
    const heroRepository = this.getMissionMainRepository(qr);

    // `exp_min`과 `exp_max` 범위 내의 rank 찾기
    const result = await heroRepository
      .createQueryBuilder('hero')
      .select('hero.rank') // rank만 가져오기
      .where('hero.exp <= :exp AND hero.total_exp >= :exp', { exp })
      .getRawOne();

    if (!result) {
      throw new NotFoundException('No matching hero rank found for given EXP.');
    }

    return result.rank;
  }
}
