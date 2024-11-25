import { Module } from '@nestjs/common';
import { EduReduceTimeService } from './edu_reduce_time.service';
import { EduReduceTimeController } from './edu_reduce_time.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EduReduceTime } from './entities/edu_reduce_time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EduReduceTime])],
  exports: [EduReduceTimeService],
  controllers: [EduReduceTimeController],
  providers: [EduReduceTimeService],
})
export class EduReduceTimeModule {}
