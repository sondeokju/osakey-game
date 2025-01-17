import { PartialType } from '@nestjs/mapped-types';
import { CreateSuitSkillDto } from './create-suit_skill.dto';

export class UpdateSuitSkillDto extends PartialType(CreateSuitSkillDto) {}
