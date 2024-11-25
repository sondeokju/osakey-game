import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserTunaTvOnline } from './entities/user-tuna-tv-online.entity';
import { UserTunaTv } from '../user_tuna_tv/entities/user_tuna_tv.entity';

@Injectable()
export class UserTunaTvOnlineService {
  constructor(
    @InjectRepository(UserTunaTvOnline)
    private readonly userTunaTvOnlineRepository: Repository<UserTunaTvOnline>,
  ) {}

  getUserTunaTvOnlineRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserTunaTvOnline>(UserTunaTvOnline)
      : this.userTunaTvOnlineRepository;
  }

  async tunaTvOnlineList(qr?: QueryRunner) {
    const userTunaTvOnlineRepository = this.getUserTunaTvOnlineRepository(qr);
    //const userTunaTvOnlineData = await userTunaTvOnlineRepository.find();
    const result = await userTunaTvOnlineRepository
      .createQueryBuilder()
      .select('user_tuna_tv_online.tuna_tv_id')
      .addSelect(
        'user_tuna_tv.ingame_kind',
        'user_tuna_tv.select_1',
        'user_tuna_tv.select_2',
        'user_tuna_tv.select_3',
      )
      .from(UserTunaTv, 'user_tuna_tv')
      .innerJoin(
        UserTunaTvOnline,
        'user_tuna_tv_online',
        'user_tuna_tv_online.tuna_tv_id = tuna_tv_id',
      ) // 조인 조건
      .getRawMany(); // Raw 데이터 가져오기

    return result;
  }
}
