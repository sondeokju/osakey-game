import { Module } from '@nestjs/common';
import { SnsLevelService } from './sns_level.service';
import { SnsLevelController } from './sns_level.controller';

@Module({
  controllers: [SnsLevelController],
  providers: [SnsLevelService],
})
export class SnsLevelModule {}
