import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserSuit } from './entities/user_suit.entity';

@Injectable()
export class UserSuitService {
  constructor(
    @InjectRepository(UserSuit)
    private readonly userSuitRepository: Repository<UserSuit>, //private readonly rewardOfferService: RewardOfferService,
  ) {}

  getUserSuitRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserSuit>(UserSuit)
      : this.userSuitRepository;
  }

  //슈트 레벨업
  async suitLevelUp(user_id: string, user_suit_id: number, qr?: QueryRunner) {
    const userSuitRepository = this.getUserSuitRepository(qr);
    const userSuit = await userSuitRepository.findOne({
      where: { id: user_suit_id, user_id },
    });

    if (!userSuit) {
      throw new NotFoundException('User suit not found');
    }

    userSuit.suit_level += 1;
    const result = await userSuitRepository.save(userSuit);

    return result;
  }

  // 슈트 필살기 레벨업
  async suitSpecialLevelUp(
    user_id: string,
    user_suit_id: number,
    qr?: QueryRunner,
  ) {
    const userSuitRepository = this.getUserSuitRepository(qr);
    const userSuit = await userSuitRepository.findOne({
      where: { id: user_suit_id, user_id },
    });

    if (!userSuit) {
      throw new NotFoundException('User suit not found');
    }

    userSuit.suit_special_level += 1;
    const result = await userSuitRepository.save(userSuit);

    return result;
  }

  // 슈트 조각으로 슈트 해금
  async unlockSuitWithSuitPieces(
    user_id: string,
    user_suit_id: number,
    qr?: QueryRunner,
  ) {
    const userSuitRepository = this.getUserSuitRepository(qr);
    const userSuit = await userSuitRepository.findOne({
      where: { id: user_suit_id, user_id },
    });

    if (!userSuit) {
      throw new NotFoundException('User suit not found');
    }

    userSuit.unlock_yn = 'Y';
    const result = await userSuitRepository.save(userSuit);

    return result;
  }

  async getUserSuit(user_id: string, qr?: QueryRunner) {
    const userSuitRepository = this.getUserSuitRepository(qr);
    const userSuit = await userSuitRepository.find({
      where: { user_id },
    });

    return userSuit;
  }
}
