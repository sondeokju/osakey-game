import { Module } from '@nestjs/common';
import { EquipSkillService } from './equip_skill.service';
import { EquipSkillController } from './equip_skill.controller';

@Module({
  controllers: [EquipSkillController],
  providers: [EquipSkillService],
})
export class EquipSkillModule {}
