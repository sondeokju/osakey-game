import { Module } from '@nestjs/common';
import { UserSecameDiaryService } from './user_secame_diary.service';
import { UserSecameDiaryController } from './user_secame_diary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSecameDiary } from './entities/user_secame_diary.entity';
import { SecameDiaryModule } from 'src/static-table/secame/secame_diary/secame_diary.module';
import { RewardOfferModule } from 'src/supervisor/reward_offer/reward_offer.module';
import { HeroModule } from 'src/static-table/hero/hero.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSecameDiary]),
    SecameDiaryModule,
    RewardOfferModule,
    HeroModule,
  ],
  exports: [UserSecameDiaryService],
  controllers: [UserSecameDiaryController],
  providers: [UserSecameDiaryService],
})
export class UserSecameDiaryModule {}
