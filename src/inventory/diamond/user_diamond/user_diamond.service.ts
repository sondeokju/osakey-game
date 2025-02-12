import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { UserDiamond } from './entities/user_diamond.entity';

@Injectable()
export class UserDiamondService {
  constructor(
    @InjectRepository(UserDiamond)
    private readonly userDiamondRepository: Repository<UserDiamond>,
    private readonly dataSource: DataSource,
  ) {}

  getUserDiamondRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserDiamond>(UserDiamond)
      : this.userDiamondRepository;
  }

  // async saveAchieve(
  //   user_id: string,
  //   achieve_id: number,
  //   achieve_count: number,
  //   progress_status: string,
  //   qr?: QueryRunner,
  // ) {
  //   if (!user_id || typeof user_id !== 'string') {
  //     throw new BadRequestException('Invalid user_id provided.');
  //   }

  //   const queryRunner = qr || this.dataSource.createQueryRunner();

  //   let isTransactionOwner = false;
  //   if (!qr) {
  //     await queryRunner.connect();
  //     await queryRunner.startTransaction();
  //     isTransactionOwner = true;
  //   }

  //   try {
  //     const userAchievementsRepository =
  //       queryRunner.manager.getRepository(UserAchievements);

  //     let userAchieve = await userAchievementsRepository.findOne({
  //       where: { user_id, achieve_id },
  //     });

  //     if (!userAchieve) {
  //       userAchieve = userAchievementsRepository.create({
  //         user_id,
  //         achieve_id,
  //         achieve_count: 0,
  //         progress_status: 'N', // 기본 상태
  //       });
  //     }

  //     if (progress_status === 'Y') {
  //       userAchieve.progress_status = progress_status;
  //       userAchieve.achieve_count += +achieve_count;
  //       userAchieve.complete_date = new Date();
  //     } else {
  //       userAchieve.achieve_count += +achieve_count;
  //     }

  //     const result = await userAchievementsRepository.save(userAchieve);

  //     if (isTransactionOwner) {
  //       await queryRunner.commitTransaction();
  //     }

  //     return result;
  //   } catch (error) {
  //     if (isTransactionOwner) {
  //       await queryRunner.rollbackTransaction();
  //     }
  //     console.error('Transaction failed:', error);
  //     throw new Error(`Transaction failed: ${error.message}`);
  //   } finally {
  //     if (isTransactionOwner) {
  //       await queryRunner.release();
  //     }
  //   }
  // }

  async getUserDiamonds(user_id: string, qr?: QueryRunner) {
    const userDiamondRepository = this.getUserDiamondRepository(qr);
    const userDiamond = await userDiamondRepository.find({
      where: {
        user_id,
      },
    });

    return userDiamond;
  }
}
