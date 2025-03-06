import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDispatchService } from 'src/inventory/dispatch/user_dispatch/user_dispatch.service';
import { HeroService } from 'src/static-table/hero/hero.service';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { UsersService } from 'src/users/users.service';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class UserHeroService {
  constructor(
    private readonly usersService: UsersService,
    private readonly heroService: HeroService,
    private readonly rewardOfferService: RewardOfferService,
    private readonly userDispatchService: UserDispatchService,
  ) {}

  async heroLevelUp(user_id: string, qr?: QueryRunner) {
    const userData = await this.usersService.getMe(user_id, qr);
    if (!userData) {
      throw new NotFoundException('userData not exist.');
    }

    const currentExp = userData.exp;
    const currentLevel = userData.level;
    //const nextLevel = currentLevel + 1;
    let updateLevel = currentLevel;
    const heroMaxLevelData = await this.heroService.getHeroMaxLevel(qr);

    if (currentLevel === heroMaxLevelData.level) {
      throw new NotFoundException('max level');
    }

    const heroLevelData = await this.heroService.getHeroLevel(
      +currentLevel,
      qr,
    );
    if (!heroLevelData) {
      throw new NotFoundException('level up exp not enough.');
    }

    if (currentExp >= heroLevelData.total_exp) {
      updateLevel = currentLevel + 1;
    }

    const updatedUserData = await this.usersService.userLevelUp(
      user_id,
      updateLevel,
      qr,
    );

    const rewardData = await this.rewardOfferService.reward(
      user_id,
      heroLevelData.reward_id,
      qr,
    );

    if (!rewardData) {
      throw new BadRequestException('Failed to process reward.');
    }

    // //영웅 등급 파견 해금
    // await this.dispatchUnlock(user_id, qr);

    return {
      reward: {
        userItemData: rewardData,
      },
      user: updatedUserData,
    };
  }

  async dispatchUnlock(user_id: string, qr?: QueryRunner) {
    const userData = await this.usersService.getMe(user_id, qr);

    const heroData = await this.heroService.getHeroLevel(userData.level);

    // 영웅 등급 확인
    if (heroData.rank === 'A') {
      await this.userDispatchService.dispatchUnlock(user_id, qr);
    }
  }
}
