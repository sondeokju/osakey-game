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
import { UserMail } from './entities/user_mail.entity';

@Injectable()
export class UserMailService {
  constructor(
    @InjectRepository(UserMail)
    private readonly userMailRepository: Repository<UserMail>,
    private readonly rewardOfferService: RewardOfferService,
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
    deadline_day: number,
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
      deadline.setDate(deadline.getDate() + +deadline_day); // 7일 추가

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

  async userMailList(user_id: string, qr?: QueryRunner) {
    const userMailRepository = this.getUserMailRepository(qr);
    const userMail = await userMailRepository.find({
      where: {
        user_id,
      },
    });

    return userMail;
  }
  async userMailItemList(user_id: string, qr?: QueryRunner) {
    const userMailRepository = this.getUserMailRepository(qr);

    const queryBuilder = userMailRepository
      .createQueryBuilder('um')
      .select([
        'um.id as id',
        'um.update_at as update_at',
        'um.created_at as created_at',
        'um.user_id as user_id',
        'um.send_type as send_type',
        'um.image_text as image_text',
        'um.mail_text as mail_text',
        'um.mail_title as mail_title',
        'um.reward_id as reward_id',
        'um.reward_yn as reward_yn',
        'um.deadline as deadline',
        'r.item_id as item_id',
        'r.item_count as item_count',
      ])
      .innerJoin('reward', 'r', 'um.reward_id = r.reward_id')
      .where('um.user_id = :user_id', { user_id });

    const userMail = await queryBuilder.getRawMany();
    return userMail;
  }

  async mailReward(user_id: string, user_mail_id: number, qr?: QueryRunner) {
    const userMailRepository = this.getUserMailRepository(qr);
    const userMailData = await userMailRepository.findOne({
      where: {
        id: user_mail_id,
        user_id,
      },
    });

    if (!userMailData) {
      throw new NotFoundException('userMailData not found.');
    }

    if (userMailData.reward_yn === 'Y') {
      throw new NotFoundException(
        'You have already claimed the userMailData reward.',
      );
    }
    const rewardData = await this.rewardOfferService.reward(
      user_id,
      userMailData.reward_id,
      qr,
    );

    // 배열 데이터에서 item_qty를 item_count로 변경
    const updatedRewardData = rewardData.map((data) => {
      if (data.item_qty !== undefined) {
        // 새로운 객체를 반환하면서 item_qty를 item_count로 변환
        return {
          ...data,
          item_count: data.item_qty, // item_qty 값을 item_count로 복사
        };
      }
      return data; // item_qty가 없는 경우 원래 객체 반환
    });

    console.log('mail updatedRewardData', updatedRewardData);

    if (!rewardData) {
      throw new BadRequestException('Failed to process reward.');
    }

    userMailData.reward_yn = 'Y';
    const updatedUserMail = await userMailRepository.save(userMailData);

    return {
      success: true,
      reward: updatedRewardData,
      userMail: updatedUserMail,
    };
  }
}
