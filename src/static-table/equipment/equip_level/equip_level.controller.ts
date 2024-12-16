import { Controller } from '@nestjs/common';
import { EquipLevelService } from './equip_level.service';

@Controller('equip-level')
export class EquipLevelController {
  constructor(private readonly equipLevelService: EquipLevelService) {}
}
