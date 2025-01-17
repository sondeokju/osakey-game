import { Module } from '@nestjs/common';
import { PassSeasonService } from './pass_season.service';
import { PassSeasonController } from './pass_season.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassSeason } from './entities/pass_season.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PassSeason])],
  exports: [PassSeasonService],
  controllers: [PassSeasonController],
  providers: [PassSeasonService],
})
export class PassSeasonModule {}
