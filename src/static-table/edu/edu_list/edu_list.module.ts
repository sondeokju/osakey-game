import { Module } from '@nestjs/common';
import { EduListService } from './edu_list.service';
import { EduListController } from './edu_list.controller';

@Module({
  controllers: [EduListController],
  providers: [EduListService],
})
export class EduListModule {}
