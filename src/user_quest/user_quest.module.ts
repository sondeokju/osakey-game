import { Module } from '@nestjs/common';
import { UserQuestService } from './user_quest.service';
import { UserQuestController } from './user_quest.controller';

@Module({
  controllers: [UserQuestController],
  providers: [UserQuestService],
})
export class UserQuestModule {}
