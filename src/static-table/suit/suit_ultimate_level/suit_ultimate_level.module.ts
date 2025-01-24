import { Module } from '@nestjs/common';
import { SuitUltimateLevelService } from './suit_ultimate_level.service';
import { SuitUltimateLevelController } from './suit_ultimate_level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitUltimateLevel } from './entities/suit_ultimate_level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuitUltimateLevel])],
  exports: [SuitUltimateLevelService],
  controllers: [SuitUltimateLevelController],
  providers: [SuitUltimateLevelService],
})
export class SuitUltimateLevelModule {}
