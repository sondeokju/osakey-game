import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Reward } from 'src/static-table/reward/entities/reward.entity';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { RewardService } from 'src/static-table/reward/reward.service';
import { HeroService } from 'src/static-table/hero/hero.service';
import { Item } from 'src/static-table/item/entities/item.entity';
import { ItemService } from 'src/static-table/item/item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Reward, Hero, Item])],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, RewardService, HeroService, ItemService],
})
export class UsersModule {}
