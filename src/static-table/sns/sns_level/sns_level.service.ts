import { Injectable } from '@nestjs/common';
import { CreateSnsLevelDto } from './dto/create-sns_level.dto';
import { UpdateSnsLevelDto } from './dto/update-sns_level.dto';

@Injectable()
export class SnsLevelService {
  create(createSnsLevelDto: CreateSnsLevelDto) {
    return 'This action adds a new snsLevel';
  }

  findAll() {
    return `This action returns all snsLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} snsLevel`;
  }

  update(id: number, updateSnsLevelDto: UpdateSnsLevelDto) {
    return `This action updates a #${id} snsLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} snsLevel`;
  }
}
