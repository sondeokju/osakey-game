import { Controller } from '@nestjs/common';
import { GachaOutputService } from './gacha_output.service';

@Controller('gacha-output')
export class GachaOutputController {
  constructor(private readonly gachaOutputService: GachaOutputService) {}
}
