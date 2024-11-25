import { Module } from '@nestjs/common';
import { EduListService } from './edu_list.service';
import { EduListController } from './edu_list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EduList } from './entities/edu_list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EduList])],
  exports: [EduListService],
  controllers: [EduListController],
  providers: [EduListService],
})
export class EduListModule {}
