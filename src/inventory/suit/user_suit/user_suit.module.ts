import { Module } from '@nestjs/common';
import { UserSuitService } from './user_suit.service';
import { UserSuitController } from './user_suit.controller';

@Module({
  controllers: [UserSuitController],
  providers: [UserSuitService],
})
export class UserSuitModule {}
