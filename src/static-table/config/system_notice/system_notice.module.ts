import { Module } from '@nestjs/common';
import { SystemNoticeService } from './system_notice.service';
import { SystemNoticeController } from './system_notice.controller';

@Module({
  controllers: [SystemNoticeController],
  providers: [SystemNoticeService],
})
export class SystemNoticeModule {}
