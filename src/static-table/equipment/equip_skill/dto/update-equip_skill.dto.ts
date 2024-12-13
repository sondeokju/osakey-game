import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipSkillDto } from './create-equip_skill.dto';

export class UpdateEquipSkillDto extends PartialType(CreateEquipSkillDto) {}
