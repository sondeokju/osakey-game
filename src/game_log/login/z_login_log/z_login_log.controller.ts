import { Controller } from '@nestjs/common';
import { ZLoginLogService } from './z_login_log.service';

@Controller('z-login-log')
export class ZLoginLogController {
  constructor(private readonly zLoginLogService: ZLoginLogService) {}
}
