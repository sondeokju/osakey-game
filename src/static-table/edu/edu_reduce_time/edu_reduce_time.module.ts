import { Module } from '@nestjs/common';
import { EduReduceTimeService } from './edu_reduce_time.service';
import { EduReduceTimeController } from './edu_reduce_time.controller';

@Module({
  controllers: [EduReduceTimeController],
  providers: [EduReduceTimeService],
})
export class EduReduceTimeModule {}
