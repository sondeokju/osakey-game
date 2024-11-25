import { Module } from '@nestjs/common';
import { EduCurriculumService } from './edu_curriculum.service';
import { EduCurriculumController } from './edu_curriculum.controller';

@Module({
  controllers: [EduCurriculumController],
  providers: [EduCurriculumService],
})
export class EduCurriculumModule {}
