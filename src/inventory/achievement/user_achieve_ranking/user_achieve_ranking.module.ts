import { Module } from '@nestjs/common';
import { UserAchieveRankingService } from './user_achieve_ranking.service';
import { UserAchieveRankingController } from './user_achieve_ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAchieveRanking } from './entities/user_achieve_ranking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAchieveRanking])],
  exports: [UserAchieveRankingService],
  controllers: [UserAchieveRankingController],
  providers: [UserAchieveRankingService],
})
export class UserAchieveRankingModule {}
