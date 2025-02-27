import { Module } from '@nestjs/common';
import { UserChallengeExtraService } from './user_challenge_extra.service';
import { UserChallengeExtraController } from './user_challenge_extra.controller';
import { UserChallengeExtra } from './entities/user_challenge_extra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserChallengeExtra])],
  exports: [UserChallengeExtraService],
  controllers: [UserChallengeExtraController],
  providers: [UserChallengeExtraService],
})
export class UserChallengeExtraModule {}
