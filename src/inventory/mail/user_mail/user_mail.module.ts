import { Module } from '@nestjs/common';
import { UserMailService } from './user_mail.service';
import { UserMailController } from './user_mail.controller';
import { UserMail } from './entities/user_mail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { HeroService } from 'src/static-table/hero/hero.service';
import { Item } from 'src/static-table/item/entities/item.entity';
import { ItemService } from 'src/static-table/item/item.service';
import { Reward } from 'src/static-table/reward/entities/reward.entity';
import { RewardService } from 'src/static-table/reward/reward.service';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { UserItem } from 'src/user_item/entities/user_item.entity';
import { UserItemService } from 'src/user_item/user_item.service';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserMail, Reward, Users, Item, UserItem, Hero]),
  ],
  exports: [UserMailService],
  controllers: [UserMailController],
  providers: [
    UserMailService,
    RewardOfferService,
    RewardService,
    UsersService,
    ItemService,
    UserItemService,
    HeroService,
  ],
})
export class UserMailModule {}
