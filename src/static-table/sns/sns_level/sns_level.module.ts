import { Module } from '@nestjs/common';
import { SnsLevelService } from './sns_level.service';
import { SnsLevelController } from './sns_level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnsLevel } from './entities/sns_level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SnsLevel])],
  exports: [SnsLevelService],
  controllers: [SnsLevelController],
  providers: [SnsLevelService],
})
export class SnsLevelModule {}
