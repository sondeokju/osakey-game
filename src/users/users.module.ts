import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { HeroService } from 'src/static-table/hero/hero.service';
import { RewardOfferModule } from 'src/supervisor/reward_offer/reward_offer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Hero]), RewardOfferModule],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, HeroService],
})
export class UsersModule {}
