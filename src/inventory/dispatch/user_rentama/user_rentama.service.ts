import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserRentama } from './entities/user_rentama.entity';
import { DispatchTestService } from 'src/static-table/dispatch/dispatch_test/dispatch_test.service';

@Injectable()
export class UserRentamaService {
  constructor(
    @InjectRepository(UserRentama)
    private readonly userRentamaRepository: Repository<UserRentama>,
    private readonly dispatchTestService: DispatchTestService,
  ) {}

  getUserRentamaRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserRentama>(UserRentama)
      : this.userRentamaRepository;
  }

  async rentamaDispatch(
    user_id: number,
    progress_mission_id: number,
    qr?: QueryRunner,
  ) {
    const userRentamaRepository = this.getUserRentamaRepository(qr);

    const userRentama = await userRentamaRepository.findOne({
      where: { user_id },
    });

    if (!userRentama) {
      throw new NotFoundException('userRentama not found');
    }
    return this.createRentama(user_id, progress_mission_id, qr);
  }

  private async createRentama(
    user_id: number,
    progress_mission_id: number,
    qr?: QueryRunner,
  ) {
    const userRentamaRepository = this.getUserRentamaRepository(qr);
    const dispatchTest = await this.dispatchTestService.getDispatchTest(1, qr);
    if (!dispatchTest) {
      throw new NotFoundException('dispatchTest not found');
    }

    const updatedDate = new Date();
    updatedDate.setMilliseconds(0);

    await userRentamaRepository.insert({
      user_id,
      progress_mission_id: progress_mission_id,
      success: dispatchTest.success,
      tama_success: dispatchTest.tama_success,
      dispatch_time: dispatchTest.time,
      dispatch_start_date: updatedDate,
      dispatch_end_date: new Date(
        updatedDate.getTime() + dispatchTest.time * 60000,
      ),
    });

    return userRentamaRepository.find({ where: { user_id } });
  }

  async dispatchComplete(
    user_id: number,
    progress_mission_id: number,
    qr?: QueryRunner,
  ) {
    const userRentamaRepository = this.getUserRentamaRepository(qr);
    const userRentama = await userRentamaRepository.findOne({
      where: { user_id, progress_mission_id },
    });

    if (!userRentama) {
      throw new NotFoundException('userRentama not found');
    }

    await userRentamaRepository.save({
      ...userRentama,
      dispatch_yn: 'Y',
    });

    const updateData = await userRentamaRepository.findOne({
      where: { user_id },
    });

    return updateData;
  }
}
