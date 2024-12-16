import { Module } from '@nestjs/common';
import { EquipSkillService } from './equip_skill.service';
import { EquipSkillController } from './equip_skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipSkill } from './entities/equip_skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipSkill])],
  exports: [EquipSkillService],
  controllers: [EquipSkillController],
  providers: [EquipSkillService],
})
export class EquipSkillModule {}
