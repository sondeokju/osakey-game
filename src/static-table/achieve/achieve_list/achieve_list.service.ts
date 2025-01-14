import { Injectable } from '@nestjs/common';
import { CreateAchieveListDto } from './dto/create-achieve_list.dto';
import { UpdateAchieveListDto } from './dto/update-achieve_list.dto';

@Injectable()
export class AchieveListService {
  create(createAchieveListDto: CreateAchieveListDto) {
    return 'This action adds a new achieveList';
  }

  findAll() {
    return `This action returns all achieveList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} achieveList`;
  }

  update(id: number, updateAchieveListDto: UpdateAchieveListDto) {
    return `This action updates a #${id} achieveList`;
  }

  remove(id: number) {
    return `This action removes a #${id} achieveList`;
  }
}
