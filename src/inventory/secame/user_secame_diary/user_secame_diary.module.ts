import { Module } from '@nestjs/common';
import { UserSecameDiaryService } from './user_secame_diary.service';
import { UserSecameDiaryController } from './user_secame_diary.controller';

@Module({
  controllers: [UserSecameDiaryController],
  providers: [UserSecameDiaryService],
})
export class UserSecameDiaryModule {}
