import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserDispatchRentama } from './entities/user_dispatch_rentama.entity';

@Injectable()
export class UserDispatchRentamaService {
  constructor(
    @InjectRepository(UserDispatchRentama)
    private readonly userDispatchRentamaRepository: Repository<UserDispatchRentama>,
  ) {}

  getUserDispatchRentamaRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserDispatchRentama>(UserDispatchRentama)
      : this.userDispatchRentamaRepository;
  }

  async getUserDispatchRentama(user_id: string, qr?: QueryRunner) {
    const userDispatchRentamaRepository =
      this.getUserDispatchRentamaRepository(qr);
    const result = await userDispatchRentamaRepository.findOne({
      where: {
        user_id,
      },
    });

    return result;
  }

  async getUserDispatchRentamaList(user_id: string, qr?: QueryRunner) {
    const userDispatchRentamaRepository =
      this.getUserDispatchRentamaRepository(qr);
    const result = await userDispatchRentamaRepository.find({
      where: {
        user_id,
      },
    });

    return result;
  }
}
