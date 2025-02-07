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

    // `exp` 값이 가장 가까운 `exp` 이상을 가진 `rank` 찾기
    const result = await heroRepository
      .createQueryBuilder('hero')
      //.select('hero.rank')
      .where('hero.exp <= :exp', { exp }) // `exp` 이상인 rank 찾기
      .orderBy('hero.exp', 'ASC') // 가장 높은 exp를 가진 데이터 우선
      .limit(1) // 1개만 가져오기
      .getRawOne();

    if (!result) {
      throw new NotFoundException(
        `No matching hero rank found for EXP: ${exp}`,
      );
    }

    return result;
  }

  // async getHeroRankByExp(exp: number, qr?: QueryRunner) {
  //   const heroRepository = this.getMissionMainRepository(qr);

  //   // `exp`가 해당 레벨의 `exp` 이상이고 `total_exp` 이하인 rank 찾기
  //   const result = await heroRepository
  //     .createQueryBuilder('hero')
  //     //.select('') // rank만 가져오기
  //     .where(':exp BETWEEN hero.exp AND hero.total_exp', { exp })
  //     .getRawOne();

  //   if (!result) {
  //     throw new NotFoundException(
  //       `No matching hero rank found for EXP: ${exp}`,
  //     );
  //   }

  //   return result;
  // }
}
