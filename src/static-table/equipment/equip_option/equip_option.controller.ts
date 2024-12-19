import { Controller } from '@nestjs/common';
import { EquipOptionService } from './equip_option.service';

@Controller('equip-option')
export class EquipOptionController {
  constructor(private readonly equipOptionService: EquipOptionService) {}
}
