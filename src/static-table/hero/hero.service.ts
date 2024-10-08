import { Injectable } from '@nestjs/common';
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
}
