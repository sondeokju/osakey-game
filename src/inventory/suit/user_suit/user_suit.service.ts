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
import { ResourceManagerService } from 'src/supervisor/resource_manager/resource_manager.service';

@Injectable()
export class UserSuitService {
  constructor(
    @InjectRepository(UserSuit)
    private readonly userSuitRepository: Repository<UserSuit>,
    private readonly suitService: SuitService,
    private readonly userItemService: UserItemService,
    private readonly resourceManagerService: ResourceManagerService,
  ) {}

  getUserSuitRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserSuit>(UserSuit)
      : this.userSuitRepository;
  }

  //슈트 장착
  async suitMount(user_id: string, suit_id: number, qr?: QueryRunner) {
    const userSuitRepository = this.getUserSuitRepository(qr);

    // 해당 유저의 다른 모든 suit의 mount_yn 값을 'N'으로 업데이트합니다.
    await userSuitRepository
      .createQueryBuilder()
      .update()
      .set({ mount_yn: 'N' })
      .where('user_id = :user_id', { user_id })
      .andWhere('suit_id <> :suit_id', { suit_id })
      .execute();

    let userSuit = await userSuitRepository.findOne({
      where: { user_id, suit_id },
    });

    // userSuit 레코드가 없으면 새로 생성합니다.
    if (!userSuit) {
      userSuit = userSuitRepository.create({
        user_id,
        suit_id,
        suit_level: 1, // 기본 값
        suit_special_level: 1, // 기본 값
        mount_yn: 'Y', // 해당 suit만 'Y'로 설정
      });
    } else {
      // 이미 존재하는 레코드인 경우, mount_yn 값을 'Y'로 변경합니다.
      userSuit.mount_yn = 'Y';
    }

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
    suit_id: number,
    qr?: QueryRunner,
  ) {
    const userSuitRepository = this.getUserSuitRepository(qr);
    let userSuitData = await userSuitRepository.findOne({
      where: { user_id, suit_id },
    });

    if (userSuitData && userSuitData.unlock_yn === 'Y') {
      return {
        message: 'already unlocked it.',
      };
    }

    // userSuit가 없으면 생성합니다.
    if (!userSuitData) {
      userSuitData = userSuitRepository.create({
        user_id,
        suit_id,
        suit_level: 1, // 기본 값
        suit_special_level: 1, // 기본 값
        unlock_yn: 'Y',
        mount_yn: 'N',
      });
      await userSuitRepository.save(userSuit);
    }

    const suitUnlockData = await this.suitService.getSuit(suit_id);
    const suitUnlockSuitPieceId = suitUnlockData.suit_piece_id;
    const suitUnlockPieceCount = suitUnlockData.unlock_piece_count;

    if (suitUnlockPieceCount >= 0) {
      await this.userItemService.reduceItem(
        user_id,
        suitUnlockSuitPieceId,
        suitUnlockPieceCount,
        qr,
      );
    }

    const userSuit = await userSuitRepository.save(userSuitData);

    return {
      // reward: {
      //   userItemData: shopRewardData,
      // },
      userSuit,
      deductedCurrency: [
        {
          item_id: suitUnlockSuitPieceId,
          item_count: suitUnlockPieceCount,
        },
      ],
    };
  }

  //   return {
  //   reward: {
  //     userItemData: shopRewardData,
  //   },
  //   userShopLimit,
  //   deductedCurrency,
  // };

  async getUserSuit(user_id: string, qr?: QueryRunner) {
    const userSuitRepository = this.getUserSuitRepository(qr);
    const userSuit = await userSuitRepository.find({
      where: { user_id },
    });

    return userSuit;
  }
}
