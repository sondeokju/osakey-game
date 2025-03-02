import { Global, Module } from '@nestjs/common';
import { UserChallengeService } from './user_challenge.service';
import { UserChallengeController } from './user_challenge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChallenge } from './entities/user_challenge.entity';
import { RewardOfferModule } from 'src/supervisor/reward_offer/reward_offer.module';
import { MissionRoutineBonusModule } from 'src/static-table/mission_routine_bonus/mission_routine_bonus.module';
import { MissionRoutineModule } from 'src/static-table/mission_routine/mission_routine.module';
import { UserChallengeExtraModule } from '../user_challenge_extra/user_challenge_extra.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserChallenge]),
    RewardOfferModule,
    MissionRoutineBonusModule,
    MissionRoutineModule,
    UserChallengeExtraModule,
  ],
  exports: [UserChallengeService],
  controllers: [UserChallengeController],
  providers: [UserChallengeService],
})
export class UserChallengeModule {}
