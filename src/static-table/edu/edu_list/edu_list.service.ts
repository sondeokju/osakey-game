import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { EduList } from './entities/edu_list.entity';

@Injectable()
export class EduListService {
  constructor(
    @InjectRepository(EduList)
    private readonly eduListRepository: Repository<EduList>,
  ) {}

  getEduListRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<EduList>(EduList)
      : this.eduListRepository;
  }

  async getEduListAll(qr?: QueryRunner) {
    const eduListRepository = this.getEduListRepository(qr);
    const result = await eduListRepository.find({});
    return result;
  }

  async getEduList(edu_list_id: number, qr?: QueryRunner) {
    const eduListRepository = this.getEduListRepository(qr);
    const result = await eduListRepository.findOne({
      where: {
        edu_list_id,
      },
    });

    return result;
  }
}
