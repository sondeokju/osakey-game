import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
//import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { UserMail } from './entities/user_mail.entity';

@Injectable()
export class UserMailService {
  constructor(
    @InjectRepository(UserMail)
    private readonly userMailRepository: Repository<UserMail>,
    //private readonly rewardOfferService: RewardOfferService,
    private readonly dataSource: DataSource,
  ) {}

  getUserMailRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserMail>(UserMail)
      : this.userMailRepository;
  }

  async saveMail(
    user_id: string,
    send_type: string,
    image_text: string,
    mail_title: string,
    mail_text: string,
    reward_id: number,
    deadline: number,
    qr?: QueryRunner,
  ) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }

    const queryRunner = qr || this.dataSource.createQueryRunner();

    let isTransactionOwner = false;
    if (!qr) {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      isTransactionOwner = true;
    }

    try {
      const userMailRepository = queryRunner.manager.getRepository(UserMail);

      const currentDate = new Date(); // 현재 날짜와 시간
      const deadline = new Date(currentDate); // 현재 날짜 복사
      deadline.setDate(deadline.getDate() + +deadline); // 7일 추가

      await userMailRepository.insert({
        user_id,
        send_type,
        image_text,
        mail_title,
        mail_text,
        reward_id,
        deadline,
      });

      if (isTransactionOwner) {
        await queryRunner.commitTransaction();
      }

      const userMailData = await userMailRepository.find({
        where: { user_id },
      });

      return userMailData;
    } catch (error) {
      if (isTransactionOwner) {
        await queryRunner.rollbackTransaction();
      }
      console.error('Transaction failed:', error);
      throw new Error(`Transaction failed: ${error.message}`);
    } finally {
      if (isTransactionOwner) {
        await queryRunner.release();
      }
    }
  }

  // async userMail(user_id: string, qr?: QueryRunner) {
  //   const userAchievementsRepository = this.getUserAchievementsRepository(qr);
  //   const userAchieve = await userAchievementsRepository.findOne({
  //     where: {
  //       user_id,
  //     },
  //   });

  //   return userAchieve;
  // }
}
