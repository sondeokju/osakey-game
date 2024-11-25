import { Injectable } from '@nestjs/common';
import { CreateEduCurriculumDto } from './dto/create-edu_curriculum.dto';
import { UpdateEduCurriculumDto } from './dto/update-edu_curriculum.dto';

@Injectable()
export class EduCurriculumService {
  create(createEduCurriculumDto: CreateEduCurriculumDto) {
    return 'This action adds a new eduCurriculum';
  }

  findAll() {
    return `This action returns all eduCurriculum`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eduCurriculum`;
  }

  update(id: number, updateEduCurriculumDto: UpdateEduCurriculumDto) {
    return `This action updates a #${id} eduCurriculum`;
  }

  remove(id: number) {
    return `This action removes a #${id} eduCurriculum`;
  }
}
