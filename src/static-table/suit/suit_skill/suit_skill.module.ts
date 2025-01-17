import { Module } from '@nestjs/common';
import { SuitSkillService } from './suit_skill.service';
import { SuitSkillController } from './suit_skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitSkill } from './entities/suit_skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuitSkill])],
  exports: [SuitSkillService],
  controllers: [SuitSkillController],
  providers: [SuitSkillService],
})
export class SuitSkillModule {}
