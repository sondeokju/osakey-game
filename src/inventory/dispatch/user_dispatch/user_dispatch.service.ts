import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserDispatch } from './entities/user_dispatch.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserDispatchService {
  constructor(
    @InjectRepository(UserDispatch)
    private readonly userDispatchRepository: Repository<UserDispatch>,
    private readonly dataSource: DataSource,
  ) {}

  getUserDispatchRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserDispatch>(UserDispatch)
      : this.userDispatchRepository;
  }

  async getUserDispatch(user_id: string, qr?: QueryRunner) {
    const userDispatchRepository = this.getUserDispatchRepository(qr);
    const result = await userDispatchRepository.find({
      where: {
        user_id,
      },
    });

    return result;
  }

  //파견 상태 (IN_PROGRESS, COMPLETED, FAILED, GREAT COMPLETED)
  async dispatchRentama(user_id: string, mission_id: number, qr?: QueryRunner) {
    const userDispatchRepository = this.getUserDispatchRepository(qr);
    let userDispatch = await userDispatchRepository.findOne({
      where: { user_id, mission_id },
    });

    if (!userDispatch) {
      userDispatch = userDispatchRepository.create({
        user_id,
        mission_id,
        dispatch_start_date: new Date(),
        dispatch_status: 'IN_PROGRESS',
      });
    } else {
      userDispatch.mission_id = mission_id;
    }

    // 생성 혹은 업데이트된 객체를 저장합니다.
    const result = await userDispatchRepository.save(userDispatch);

    return result;
  }

  async dispatchUnlock(user_id: string, qr?: QueryRunner) {
    await this.dataSource.query(
      `UPDATE user_dispatch
    SET dispatch_unlocked = 'Y'
    WHERE user_id = ?`,
      [user_id],
    );
  }
}
