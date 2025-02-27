import { Module } from '@nestjs/common';
import { UserChallengeService } from './user_challenge.service';
import { UserChallengeController } from './user_challenge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChallenge } from './entities/user_challenge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserChallenge])],
  exports: [UserChallengeService],
  controllers: [UserChallengeController],
  providers: [UserChallengeService],
})
export class UserChallengeModule {}
