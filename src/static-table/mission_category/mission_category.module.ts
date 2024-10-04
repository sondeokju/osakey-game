import { Module } from '@nestjs/common';
import { MissionCategoryService } from './mission_category.service';
import { MissionCategoryController } from './mission_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionCategory } from './entities/mission_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MissionCategory])],
  exports: [MissionCategoryService],
  controllers: [MissionCategoryController],
  providers: [MissionCategoryService],
})
export class MissionCategoryModule {}
