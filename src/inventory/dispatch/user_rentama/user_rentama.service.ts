import { Injectable } from '@nestjs/common';
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
}
