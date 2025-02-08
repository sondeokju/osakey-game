import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HeroService } from 'src/static-table/hero/hero.service';
import { UsersService } from 'src/users/users.service';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class UserHeroService {
  constructor(
    private readonly usersService: UsersService,
    private readonly heroService: HeroService,
  ) {}

  async heroLevelUp(user_id: string, qr?: QueryRunner) {
    const userData = await this.usersService.getMe(user_id, qr);
    if (!userData) {
      throw new NotFoundException('userData not exist.');
    }

    const currentExp = userData.exp;
    const currentLevel = userData.level;
    const nextLevel = currentLevel + 1;
    let updateLevel = currentLevel;

    const heroLevelData = await this.heroService.getHeroLevel(+nextLevel);
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

    // const rewardData = await this.rewardOfferService.reward(
    //   user_id,
    //   heroLevelData.reward_id,
    //   qr,
    // );

    // if (!rewardData) {
    //   throw new BadRequestException('Failed to process reward.');
    // }

    return {
      //reward: rewardData,
      updatedUserData: updatedUserData,
    };
  }
}
