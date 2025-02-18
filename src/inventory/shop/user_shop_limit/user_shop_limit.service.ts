import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserShopLimit } from './entities/user_shop_limit.entity';

@Injectable()
export class UserShopLimitService {
  constructor(
    @InjectRepository(UserShopLimit)
    private readonly userShopLimitRepository: Repository<UserShopLimit>,
  ) {}

  getUserShopLimitRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserShopLimit>(UserShopLimit)
      : this.userShopLimitRepository;
  }

  async getUserShopLimitAll(user_id: string, qr?: QueryRunner) {
    const userShopLimitRepository = this.getUserShopLimitRepository(qr);
    const userShopLimit = await userShopLimitRepository.find({
      where: { user_id },
    });

    return userShopLimit;
  }

  async shopLimitAdd(user_id: string, shop_id: number, qr?: QueryRunner) {
    const userShopLimitRepository = this.getUserShopLimitRepository(qr);

    const newShopLimit = userShopLimitRepository.create({
      user_id,
      //shop_id: +mail_id,
      //  read_yn: 'N',
      //  mail_accept_date: new Date(),
    });

    const result = await userShopLimitRepository.save(newShopLimit);

    return result;
  }
}
