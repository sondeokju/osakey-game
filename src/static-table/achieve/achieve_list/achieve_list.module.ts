import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchieveListService } from './achieve_list.service';
import { AchieveListController } from './achieve_list.controller';
import { AchieveList } from './entities/achieve_list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AchieveList])],
  exports: [AchieveListService],
  controllers: [AchieveListController],
  providers: [AchieveListService],
})
export class AchieveListModule {}
