import { Module } from '@nestjs/common';
import { SnsConfigService } from './sns_config.service';
import { SnsConfigController } from './sns_config.controller';

@Module({
  controllers: [SnsConfigController],
  providers: [SnsConfigService],
})
export class SnsConfigModule {}
