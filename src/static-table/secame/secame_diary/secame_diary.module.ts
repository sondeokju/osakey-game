import { Module } from '@nestjs/common';
import { SecameDiaryService } from './secame_diary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecameDiary } from './entities/secame_diary.entity';
import { SecameDiaryController } from './secame_diary.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SecameDiary])],
  exports: [SecameDiaryService],
  controllers: [SecameDiaryController],
  providers: [SecameDiaryService],
})
export class SecameDiaryModule {}
