import { Controller } from '@nestjs/common';
import { SystemNoticeService } from './system_notice.service';

@Controller('system-notice')
export class SystemNoticeController {
  constructor(private readonly systemNoticeService: SystemNoticeService) {}
}
