import { Module } from '@nestjs/common';
import { SuitLevelInfoService } from './suit_level_info.service';
import { SuitLevelInfoController } from './suit_level_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitLevelInfo } from './entities/suit_level_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuitLevelInfo])],
  exports: [SuitLevelInfoService],
  controllers: [SuitLevelInfoController],
  providers: [SuitLevelInfoService],
})
export class SuitLevelInfoModule {}
