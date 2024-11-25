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

  // async tunaTvOnlineList(qr?: QueryRunner) {
  //   const userTunaTvOnlineRepository = this.getUserTunaTvOnlineRepository(qr);
  //   const result = await userTunaTvOnlineRepository
  //     .createQueryBuilder('a') // `user_tuna_tv_online` 테이블의 별칭을 `a`로 설정
  //     .select('a.tuna_tv_id', 'tunaTvId') // 첫 번째 테이블에서 tuna_tv_id 선택
  //     .addSelect('b.ingame_kind', 'ingameKind') // 두 번째 테이블에서 ingame_kind 선택
  //     .addSelect('b.select_1', 'select1')
  //     .addSelect('b.select_2', 'select2')
  //     .addSelect('b.select_3', 'select3')
  //     .addSelect('b.score', 'score') // 추가 선택
  //     .innerJoin(
  //       'user_tuna_tv', // 조인 대상 테이블
  //       'b', // 조인 대상 테이블의 별칭
  //       'a.tuna_tv_id = b.id', // 조인 조건
  //     )
  //     .getRawMany(); // Raw 데이터 가져오기

  //   return result;
  // }

  async tunaTvOnlineList() {
    const result = await this.executeRawQuery();

    return result;
  }

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
