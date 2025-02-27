import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
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
      userGachaCheck.fixed_1_draw_count += 1;
    } else if (item_grade_type === 5) {
      userGachaCheck.fixed_item_grade_2_count += item_grade_count;
      userGachaCheck.fixed_2_draw_count += 1;
    }

    const updatedUserGachaCheck =
      await userGachaCheckRepository.save(userGachaCheck);

    return updatedUserGachaCheck;
  }

  async gachaDrawCountPlus(user_id: string, qr?: QueryRunner) {
    const userGachaCheckRepository = this.getUserGachaCheckRepository(qr);
    const userGachaCheck = await userGachaCheckRepository.findOne({
      where: {
        user_id,
      },
    });

    userGachaCheck.fixed_1_draw_count += 1;

    const updatedUserGachaCheck =
      await userGachaCheckRepository.save(userGachaCheck);

    return updatedUserGachaCheck;
  }

  async defaultGachaCountSetting(
    user_id: string,
    gacha_id: number,
    fixed_item_grade_1_count: number,
    fixed_item_grade_2_count: number,
    qr?: QueryRunner,
  ) {
    const userGachaCheckRepository = this.getUserGachaCheckRepository(qr);
    let userGachaCheck = await userGachaCheckRepository.findOne({
      where: { user_id, gacha_id },
    });

    if (!userGachaCheck) {
      // userGachaCheck가 없으면 새로운 데이터 삽입
      await userGachaCheckRepository.insert({
        user_id,
        gacha_id,
        fixed_1_draw_count: 1,
        fixed_item_grade_1_count,
        fixed_2_draw_count: 1,
        fixed_item_grade_2_count,
      });

      // 삽입된 데이터 다시 조회
      userGachaCheck = await userGachaCheckRepository.findOne({
        where: { user_id, gacha_id },
      });
    } else {
      await userGachaCheckRepository.increment(
        { user_id, gacha_id },
        'fixed_1_draw_count',
        1,
      );

      await userGachaCheckRepository.increment(
        { user_id, gacha_id },
        'fixed_2_draw_count',
        1,
      );

      // 업데이트된 데이터 다시 조회
      userGachaCheck = await userGachaCheckRepository.findOne({
        where: { user_id, gacha_id },
      });
    }

    return userGachaCheck;
  }
}
