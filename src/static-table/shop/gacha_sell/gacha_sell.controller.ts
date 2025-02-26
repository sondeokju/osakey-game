import { Controller } from '@nestjs/common';
import { GachaSellService } from './gacha_sell.service';

@Controller('shop')
export class GachaSellController {
  constructor(private readonly gachaSellService: GachaSellService) {}
}
