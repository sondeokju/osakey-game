import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository, DataSource } from 'typeorm';
import { UserTunaTvOnline } from './entities/user-tuna-tv-online.entity';

@Injectable()
export class UserTunaTvOnlineService {
  constructor(
    @InjectRepository(UserTunaTvOnline)
    private readonly userTunaTvOnlineRepository: Repository<UserTunaTvOnline>,
    private dataSource: DataSource,
  ) {}

  getUserTunaTvOnlineRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserTunaTvOnline>(UserTunaTvOnline)
      : this.userTunaTvOnlineRepository;
  }

  async tunaTvOnlineList(qr?: QueryRunner) {
    const userTunaTvOnlineRepository = this.getUserTunaTvOnlineRepository(qr);
    const result = await userTunaTvOnlineRepository
      .createQueryBuilder('tuna_tv_online')
      .select('tuna_tv_online.tuna_tv_id', 'tuna_tv_id')
      .addSelect('tuna_tv')
      .addSelect('user.nickname', 'nickname')
      .addSelect('user.level', 'level')
      .innerJoin(
        'user_tuna_tv',
        'tuna_tv',
        'tuna_tv_online.tuna_tv_id = tuna_tv.id',
      )
      .innerJoin('users', 'user', 'tuna_tv.user_id = user.id')
      .getRawMany();

    return result;
  }

  // async tunaTvOnlineList(qr?: QueryRunner) {
  //   const result = await this.executeRawQuery();

  //   return result;
  // }

  async executeRawQuery() {
    const query = `
              SELECT a.tuna_tv_id, b.ingame_kind, b.select_1, b.select_2, b.select_3, b.score
              FROM user_tuna_tv_online a
              inner join user_tuna_tv b
              on a.tuna_tv_id = b.id;`;

    console.log(query);

    return await this.dataSource.query(query);
  }
}
