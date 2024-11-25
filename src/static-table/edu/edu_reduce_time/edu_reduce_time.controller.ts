import { Controller } from '@nestjs/common';
import { EduReduceTimeService } from './edu_reduce_time.service';

@Controller('edu-reduce-time')
export class EduReduceTimeController {
  constructor(private readonly eduReduceTimeService: EduReduceTimeService) {}
}
