import { Controller } from '@nestjs/common';
import { EquipSkillService } from './equip_skill.service';

@Controller('equip-skill')
export class EquipSkillController {
  constructor(private readonly equipSkillService: EquipSkillService) {}
}
