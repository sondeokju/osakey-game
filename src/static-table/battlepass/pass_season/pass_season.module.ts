import { Module } from '@nestjs/common';
import { PassSeasonService } from './pass_season.service';
import { PassSeasonController } from './pass_season.controller';

@Module({
  controllers: [PassSeasonController],
  providers: [PassSeasonService],
})
export class PassSeasonModule {}
