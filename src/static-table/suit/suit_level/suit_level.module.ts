import { Module } from '@nestjs/common';
import { SuitLevelService } from './suit_level.service';
import { SuitLevelController } from './suit_level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitLevel } from './entities/suit_level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuitLevel])],
  exports: [SuitLevelService],
  controllers: [SuitLevelController],
  providers: [SuitLevelService],
})
export class SuitLevelModule {}
