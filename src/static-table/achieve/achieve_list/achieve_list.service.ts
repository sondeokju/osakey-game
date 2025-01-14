import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { AchieveList } from './entities/achieve_list.entity';

@Injectable()
export class AchieveListService {
  constructor(
    @InjectRepository(AchieveList)
    private readonly achieveListRepository: Repository<AchieveList>,
  ) {}

  getAchieveListRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<AchieveList>(AchieveList)
      : this.achieveListRepository;
  }

  async getAttendanceAll(qr?: QueryRunner) {
    const achieveListRepository = this.getAchieveListRepository(qr);
    const result = await achieveListRepository.find({});
    return result;
  }

  async getAttendance(achieve_id: number, qr?: QueryRunner) {
    const achieveListRepository = this.getAchieveListRepository(qr);
    const result = await achieveListRepository.findOne({
      where: {
        achieve_id,
      },
    });

    return result;
  }
}
