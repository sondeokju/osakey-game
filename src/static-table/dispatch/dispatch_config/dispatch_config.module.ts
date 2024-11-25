import { Module } from '@nestjs/common';
import { DispatchConfigService } from './dispatch_config.service';
import { DispatchConfigController } from './dispatch_config.controller';

@Module({
  controllers: [DispatchConfigController],
  providers: [DispatchConfigService],
})
export class DispatchConfigModule {}
