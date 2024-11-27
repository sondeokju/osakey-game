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
      .createQueryBuilder('tuna_tv_online') // `user_tuna_tv_online` 테이블의 별칭을 `a`로 설정
      .select('tuna_tv_online.tuna_tv_id', 'tuna_tv_id') // 첫 번째 테이블에서 tuna_tv_id 선택
      .addSelect('tuna_tv') // 두 번째 테이블에서 ingame_kind 선택
      .addSelect('user.nickname', 'nickname') // user 테이블에서 level 컬럼 추가
      .addSelect('user.level', 'level') // user 테이블에서 level 컬럼 추가
      .innerJoin(
        'user_tuna_tv', // 조인 대상 테이블
        'tuna_tv', // 조인 대상 테이블의 별칭
        'tuna_tv_online.tuna_tv_id = tuna_tv.id', // 조인 조건
      )
      .innerJoin(
        'users', // `user` 테이블 조인
        'user', // `user` 테이블의 별칭
        'tuna_tv.user_id = user.id', // `user_tuna_tv`와 `user`의 조인 조건
      )
      .getRawMany(); // Raw 데이터 가져오기

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
