import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillController } from './skill.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  exports: [SkillService],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
