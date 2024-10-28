import { Module } from '@nestjs/common';
import { LogUrlService } from './log_url.service';
import { LogUrlController } from './log_url.controller';

@Module({
  controllers: [LogUrlController],
  providers: [LogUrlService],
})
export class LogUrlModule {}
