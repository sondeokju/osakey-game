import { Module } from '@nestjs/common';
import { UserSecameDiaryService } from './user_secame_diary.service';
import { UserSecameDiaryController } from './user_secame_diary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSecameDiary } from './entities/user_secame_diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSecameDiary])],
  exports: [UserSecameDiaryService],
  controllers: [UserSecameDiaryController],
  providers: [UserSecameDiaryService],
})
export class UserSecameDiaryModule {}
