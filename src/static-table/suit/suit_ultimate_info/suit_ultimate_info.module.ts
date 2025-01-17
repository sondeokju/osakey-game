import { Module } from '@nestjs/common';
import { SuitUltimateInfoService } from './suit_ultimate_info.service';
import { SuitUltimateInfoController } from './suit_ultimate_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitUltimateInfo } from './entities/suit_ultimate_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuitUltimateInfo])],
  exports: [SuitUltimateInfoService],
  controllers: [SuitUltimateInfoController],
  providers: [SuitUltimateInfoService],
})
export class SuitUltimateInfoModule {}
