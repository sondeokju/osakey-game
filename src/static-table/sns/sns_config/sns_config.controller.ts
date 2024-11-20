import { Controller, Get, Post } from '@nestjs/common';
import { SnsConfigService } from './sns_config.service';

@Controller('sns-config')
export class SnsConfigController {
  constructor(private readonly snsConfigService: SnsConfigService) {}
}
