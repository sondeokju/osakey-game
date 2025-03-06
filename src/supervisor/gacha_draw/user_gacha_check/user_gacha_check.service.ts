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

  async getUserGachaCheckAll(user_id: string, qr?: QueryRunner) {
    const userGachaCheckRepository = this.getUserGachaCheckRepository(qr);
    const userGachaCheck = await userGachaCheckRepository.find({
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

  async gachaDrawReset(
    user_id: string,
    gacha_id: number,
    item_grade_type: number,
    reset_count: number,
    qr?: QueryRunner,
  ) {
    const userGachaCheckRepository = this.getUserGachaCheckRepository(qr);
    const userGachaCheck = await userGachaCheckRepository.findOne({
      where: {
        user_id,
        gacha_id,
      },
    });

    console.log('gacha_id:', gacha_id);
    console.log('item_grade_type:', item_grade_type);
    console.log('reset_count:', reset_count);
    if (item_grade_type === 4) {
      userGachaCheck.fixed_item_grade_1_count = reset_count;
      userGachaCheck.fixed_1_draw_count = 0;
    } else if (item_grade_type === 5) {
      userGachaCheck.fixed_item_grade_2_count = reset_count;
      userGachaCheck.fixed_2_draw_count = 0;
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
        fixed_item_grade_1_count: Math.max(0, fixed_item_grade_1_count - 1), // 0보다 작아지지 않도록 처리,
        fixed_2_draw_count: 1,
        fixed_item_grade_2_count: Math.max(0, fixed_item_grade_2_count - 1), // 0보다 작아지지 않도록 처리
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

      await userGachaCheckRepository.decrement(
        { user_id, gacha_id },
        'fixed_item_grade_1_count',
        1,
      );

      // 감소 후 값이 0보다 작으면 0으로 업데이트
      userGachaCheck = await userGachaCheckRepository.findOne({
        where: { user_id, gacha_id },
      });

      if (userGachaCheck && userGachaCheck.fixed_item_grade_1_count < 0) {
        await userGachaCheckRepository.update(
          { user_id, gacha_id },
          { fixed_item_grade_1_count: 0 },
        );
      }

      await userGachaCheckRepository.increment(
        { user_id, gacha_id },
        'fixed_2_draw_count',
        1,
      );

      await userGachaCheckRepository.decrement(
        { user_id, gacha_id },
        'fixed_item_grade_2_count',
        1,
      );

      // 감소 후 값이 0보다 작으면 0으로 업데이트
      userGachaCheck = await userGachaCheckRepository.findOne({
        where: { user_id, gacha_id },
      });

      if (userGachaCheck && userGachaCheck.fixed_item_grade_2_count < 0) {
        await userGachaCheckRepository.update(
          { user_id, gacha_id },
          { fixed_item_grade_2_count: 0 },
        );
      }

      // 업데이트된 데이터 다시 조회
      userGachaCheck = await userGachaCheckRepository.findOne({
        where: { user_id, gacha_id },
      });
    }

    return userGachaCheck;
  }

  async defaultGachaCountSetting10(
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
        fixed_1_draw_count: 10,
        fixed_item_grade_1_count: Math.max(0, fixed_item_grade_1_count - 10), // 0보다 작아지지 않도록 처리,
        fixed_2_draw_count: 10,
        fixed_item_grade_2_count: Math.max(0, fixed_item_grade_2_count - 10), // 0보다 작아지지 않도록 처리
      });

      // 삽입된 데이터 다시 조회
      userGachaCheck = await userGachaCheckRepository.findOne({
        where: { user_id, gacha_id },
      });
    } else {
      await userGachaCheckRepository.increment(
        { user_id, gacha_id },
        'fixed_1_draw_count',
        10,
      );

      await userGachaCheckRepository.decrement(
        { user_id, gacha_id },
        'fixed_item_grade_1_count',
        10,
      );

      // 감소 후 값이 0보다 작으면 0으로 업데이트
      userGachaCheck = await userGachaCheckRepository.findOne({
        where: { user_id, gacha_id },
      });

      if (userGachaCheck && userGachaCheck.fixed_item_grade_1_count < 0) {
        await userGachaCheckRepository.update(
          { user_id, gacha_id },
          { fixed_item_grade_1_count: 0 },
        );
      }

      await userGachaCheckRepository.increment(
        { user_id, gacha_id },
        'fixed_2_draw_count',
        10,
      );

      await userGachaCheckRepository.decrement(
        { user_id, gacha_id },
        'fixed_item_grade_2_count',
        10,
      );

      // 감소 후 값이 0보다 작으면 0으로 업데이트
      userGachaCheck = await userGachaCheckRepository.findOne({
        where: { user_id, gacha_id },
      });

      if (userGachaCheck && userGachaCheck.fixed_item_grade_2_count < 0) {
        await userGachaCheckRepository.update(
          { user_id, gacha_id },
          { fixed_item_grade_2_count: 0 },
        );
      }

      // 업데이트된 데이터 다시 조회
      userGachaCheck = await userGachaCheckRepository.findOne({
        where: { user_id, gacha_id },
      });
    }

    return userGachaCheck;
  }
}
