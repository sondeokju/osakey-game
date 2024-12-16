import { Controller } from '@nestjs/common';
import { EquipService } from './equip.service';

@Controller('equip')
export class EquipController {
  constructor(private readonly equipService: EquipService) {}
}
