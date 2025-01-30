import { Controller } from '@nestjs/common';
import { UserSettingService } from './user_setting.service';

@Controller('user-setting')
export class UserSettingController {
  constructor(private readonly userSettingService: UserSettingService) {}
}
