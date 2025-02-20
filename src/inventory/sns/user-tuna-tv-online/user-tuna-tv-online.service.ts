import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository, DataSource } from 'typeorm';
import { UserTunaTvOnline } from './entities/user-tuna-tv-online.entity';
import { UserTunaTvService } from '../user_tuna_tv/user_tuna_tv.service';

@Injectable()
export class UserTunaTvOnlineService {
  constructor(
    @InjectRepository(UserTunaTvOnline)
    private readonly userTunaTvOnlineRepository: Repository<UserTunaTvOnline>,
    private dataSource: DataSource,
    private userTunaTvServer: UserTunaTvService,
  ) {}
  getUserTunaTvOnlineRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserTunaTvOnline>(UserTunaTvOnline)
      : this.userTunaTvOnlineRepository;
  }

  async tunaTvOnlineList(qr?: QueryRunner) {
    const userTunaTvOnlineRepository = this.getUserTunaTvOnlineRepository(qr);
    const userTunaTvOnline = await userTunaTvOnlineRepository.find({});

    if (!userTunaTvOnline || userTunaTvOnline.length === 0) {
      console.log('No online users found.');
      return []; // 빈 배열을 명시적으로 반환
    }

    for (const online of userTunaTvOnline) {
      try {
        await this.userTunaTvServer.TunaTvViewAdd(online.tuna_tv_id, qr);
      } catch (error) {
        console.error(
          `Failed to increase view count for tuna_tv_id: ${online.tuna_tv_id}`,
        );
        console.error(error.message);
      }
    }

    let result = {};
    try {
      result = await userTunaTvOnlineRepository
        .createQueryBuilder('tuna_tv_online')
        .select('tuna_tv_online.tuna_tv_id', 'tuna_tv_id')
        .addSelect('tuna_tv_online.online_type', 'online_type')
        .addSelect('tuna_tv')
        .addSelect('user.nickname', 'nickname')
        .addSelect('user.level', 'level')
        .addSelect('user.id', 'id')
        .innerJoin(
          'user_tuna_tv',
          'tuna_tv',
          'tuna_tv_online.tuna_tv_id = tuna_tv.id',
        )
        .innerJoin('users', 'user', 'tuna_tv.user_id = user.user_id')
        .getRawMany();
    } catch (error) {
      console.error('Error fetching tuna_tv_online:', error);
    }

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
