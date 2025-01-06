import { Controller } from '@nestjs/common';
import { ServerConfigService } from './server_config.service';

@Controller('server-config')
export class ServerConfigController {
  constructor(private readonly serverConfigService: ServerConfigService) {}
}
