import { Module } from '@nestjs/common';
import { SuitUltimateLevelInfoService } from './suit_ultimate_level_info.service';
import { SuitUltimateLevelInfoController } from './suit_ultimate_level_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitUltimateLevelInfo } from './entities/suit_ultimate_level_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuitUltimateLevelInfo])],
  exports: [SuitUltimateLevelInfoService],
  controllers: [SuitUltimateLevelInfoController],
  providers: [SuitUltimateLevelInfoService],
})
export class SuitUltimateLevelInfoModule {}
