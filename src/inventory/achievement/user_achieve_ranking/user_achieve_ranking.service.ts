import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { UserAchieveRanking } from './entities/user_achieve_ranking.entity';

@Injectable()
export class UserAchieveRankingService {
  constructor(
    @InjectRepository(UserAchieveRanking)
    private readonly userAchieveRankingRepository: Repository<UserAchieveRanking>,
    private readonly dataSource: DataSource,
  ) {}

  getUserAchieveRankingRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserAchieveRanking>(UserAchieveRanking)
      : this.userAchieveRankingRepository;
  }

  async getUserAchieveRanking(user_id: string, qr?: QueryRunner) {
    const userAchieveRankingRepository =
      this.getUserAchieveRankingRepository(qr);
    const userAchieveRanking = await userAchieveRankingRepository.findOne({
      where: { user_id },
    });

    return userAchieveRanking;
  }

  async achievePointPlus(user_id: string, season: number, qr?: QueryRunner) {
    const userAchieveRankingRepository =
      this.getUserAchieveRankingRepository(qr);
    let userAchieveRanking = await userAchieveRankingRepository.findOne({
      where: { user_id, season },
    });
    if (!userAchieveRanking) {
      userAchieveRanking = userAchieveRankingRepository.create({
        user_id,
        season,
        achieve_point: 0,
      });
    }
    userAchieveRanking.achieve_point += 1;

    const result = await userAchieveRankingRepository.save(userAchieveRanking);
    return {
      userAchieveRanking: result,
    };
  }
}
