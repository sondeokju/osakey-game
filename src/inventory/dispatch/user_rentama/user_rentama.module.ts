import { Module } from '@nestjs/common';
import { UserRentamaService } from './user_rentama.service';
import { UserRentamaController } from './user_rentama.controller';
import { UserRentama } from './entities/user_rentama.entity';
import { Item } from 'src/static-table/item/entities/item.entity';
import { Reward } from 'src/static-table/reward/entities/reward.entity';
import { Users } from 'src/users/entity/users.entity';
import { UserItem } from 'src/user_item/entities/user_item.entity';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroService } from 'src/static-table/hero/hero.service';
import { ItemService } from 'src/static-table/item/item.service';
import { RewardService } from 'src/static-table/reward/reward.service';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { UserItemService } from 'src/user_item/user_item.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRentama,
      Item,
      Reward,
      Users,
      UserItem,
      Hero,
    ]),
  ],
  exports: [UserRentamaService],
  controllers: [UserRentamaController],
  providers: [
    UserRentamaService,
    ItemService,
    RewardOfferService,
    RewardService,
    UsersService,
    UserItemService,
    HeroService,
  ],
})
export class UserRentamaModule {}
