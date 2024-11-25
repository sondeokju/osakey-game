import { Module } from '@nestjs/common';
import { EduCurriculumService } from './edu_curriculum.service';
import { EduCurriculumController } from './edu_curriculum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EduCurriculum } from './entities/edu_curriculum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EduCurriculum])],
  exports: [EduCurriculumService],
  controllers: [EduCurriculumController],
  providers: [EduCurriculumService],
})
export class EduCurriculumModule {}
