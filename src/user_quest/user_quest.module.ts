import { Module } from '@nestjs/common';
import { UserQuestService } from './user_quest.service';
import { UserQuestController } from './user_quest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuest } from './entity/user_quest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuest])],
  exports: [UserQuestService],
  controllers: [UserQuestController],
  providers: [UserQuestService],
})
export class UserQuestModule {}
