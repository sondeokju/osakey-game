import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserSuit } from './entities/user_suit.entity';
import { SuitService } from 'src/static-table/suit/suit/suit.service';
import { UserItemService } from 'src/user_item/user_item.service';

@Injectable()
export class UserSuitService {
  constructor(
    @InjectRepository(UserSuit)
    private readonly userSuitRepository: Repository<UserSuit>,
    private readonly suitService: SuitService,
    private readonly userItemService: UserItemService,
  ) {}

  getUserSuitRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserSuit>(UserSuit)
      : this.userSuitRepository;
  }

  //슈트 장착
  async suitMount(user_id: string, suit_id: number, qr?: QueryRunner) {
    const userSuitRepository = this.getUserSuitRepository(qr);
    let userSuit = await userSuitRepository.findOne({
      where: { user_id, suit_id },
    });

    if (!userSuit) {
      userSuit = userSuitRepository.create({ user_id, suit_id });
    }

    userSuit.unlock_yn = 'Y';
    userSuit.mount_yn = 'Y';
    const result = await userSuitRepository.save(userSuit);
    return {
      userSuitData: result,
    };
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
    const suitData = await userSuitRepository.save(userSuit);

    const result = {
      item_id: suitData.suit_id,
      item_count: 1,
    };
    return suitData;
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

    if (userSuit.unlock_yn === 'Y') {
      return {
        message: 'already unlocked it.',
      };
    }

    const suitUnlockData = await this.suitService.getSuit(userSuit.suit_id);
    const suitUnlockSuitPieceId = suitUnlockData.suit_piece_id;
    const suitUnlockPieceCount = suitUnlockData.unlock_piece_count;

    const reduceItemresult = await this.userItemService.reduceItem(
      user_id,
      suitUnlockSuitPieceId,
      suitUnlockPieceCount,
      qr,
    );
    if (reduceItemresult) {
      userSuit.unlock_yn = 'Y';
    }

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
