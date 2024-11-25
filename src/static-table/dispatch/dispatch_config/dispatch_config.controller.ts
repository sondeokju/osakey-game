import { Controller } from '@nestjs/common';
import { DispatchConfigService } from './dispatch_config.service';

@Controller('dispatch-config')
export class DispatchConfigController {
  constructor(private readonly dispatchConfigService: DispatchConfigService) {}
}
