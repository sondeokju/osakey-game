import { Module } from '@nestjs/common';
import { SuitUltimateService } from './suit_ultimate.service';
import { SuitUltimateController } from './suit_ultimate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitUltimate } from './entities/suit_ultimate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuitUltimate])],
  exports: [SuitUltimateService],
  controllers: [SuitUltimateController],
  providers: [SuitUltimateService],
})
export class SuitUltimateModule {}
