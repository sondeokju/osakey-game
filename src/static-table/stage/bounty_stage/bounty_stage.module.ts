import { Module } from '@nestjs/common';
import { BountyStageService } from './bounty_stage.service';
import { BountyStageController } from './bounty_stage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BountyStage } from './entities/bounty_stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BountyStage])],
  exports: [BountyStageService],
  controllers: [BountyStageController],
  providers: [BountyStageService],
})
export class BountyStageModule {}
