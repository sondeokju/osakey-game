import { Injectable } from '@nestjs/common';
import { CreateMissionCategoryDto } from './dto/create-mission_category.dto';
import { UpdateMissionCategoryDto } from './dto/update-mission_category.dto';

@Injectable()
export class MissionCategoryService {
  create(createMissionCategoryDto: CreateMissionCategoryDto) {
    return 'This action adds a new missionCategory';
  }

  findAll() {
    return `This action returns all missionCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} missionCategory`;
  }

  update(id: number, updateMissionCategoryDto: UpdateMissionCategoryDto) {
    return `This action updates a #${id} missionCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} missionCategory`;
  }
}
