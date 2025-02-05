import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { UserAchievements } from './entities/user_achievements.entity';
import { AchieveListService } from 'src/static-table/achieve/achieve_list/achieve_list.service';
import { UserGachaCheck } from './entities/user_gacha_check.entity';

@Injectable()
export class UserGachaCheckService {
  constructor(
    @InjectRepository(UserGachaCheck)
    private readonly userGachaCheckRepository: Repository<UserGachaCheck>,
    private readonly dataSource: DataSource,
  ) {}

  getUserGachaCheckRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserGachaCheck>(UserGachaCheck)
      : this.userGachaCheckRepository;
  }

  async getGachaDrawItemGrade(user_id: string, qr?: QueryRunner) {
    const userGachaCheckRepository = this.getUserGachaCheckRepository(qr);
    const userGachaCheck = await userGachaCheckRepository.findOne({
      where: {
        user_id,
      },
    });

    return userGachaCheck;
  }

  async gachaDrawItemGradeReset(
    user_id: string,
    item_grade_type: number,
    qr?: QueryRunner,
  ) {
    const userGachaCheckRepository = this.getUserGachaCheckRepository(qr);
    const userGachaCheck = await userGachaCheckRepository.findOne({
      where: {
        user_id,
      },
    });

    if (item_grade_type === 4) {
      userGachaCheck.fixed_1_draw_count = 0;
      userGachaCheck.fixed_item_grade_1_count = 0;
    } else if (item_grade_type === 5) {
      userGachaCheck.fixed_2_draw_count = 0;
      userGachaCheck.fixed_item_grade_2_count = 0;
    }

    const updatedUserGachaCheck =
      await userGachaCheckRepository.save(userGachaCheck);

    return updatedUserGachaCheck;
  }

  async gachaDrawItemGradeSave(
    user_id: string,
    item_grade_type: number,
    item_grade_count: number,
    qr?: QueryRunner,
  ) {
    const userGachaCheckRepository = this.getUserGachaCheckRepository(qr);
    const userGachaCheck = await userGachaCheckRepository.findOne({
      where: {
        user_id,
      },
    });

    if (item_grade_type === 4) {
      userGachaCheck.fixed_item_grade_1_count += item_grade_count;
    } else if (item_grade_type === 5) {
      userGachaCheck.fixed_item_grade_2_count += item_grade_count;
    }

    userGachaCheck.fixed_1_draw_count += 1;
    userGachaCheck.fixed_2_draw_count += 1;

    const updatedUserGachaCheck =
      await userGachaCheckRepository.save(userGachaCheck);

    return updatedUserGachaCheck;
  }
}
