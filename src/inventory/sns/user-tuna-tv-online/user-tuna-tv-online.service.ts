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
      .createQueryBuilder('tv_online') // 기본 테이블 별칭 설정
      .select('tv_online.tuna_tv_id', 'tunaTvId') // 첫 번째 컬럼 선택
      .addSelect([
        'user_tuna_tv.ingame_kind',
        'user_tuna_tv.select_1',
        'user_tuna_tv.select_2',
        'user_tuna_tv.select_3',
      ]) // 추가 컬럼 선택
      .innerJoin(
        'user_tuna_tv', // 조인 대상 테이블
        'tunaTv', // 조인 대상 테이블의 별칭
        'tv_online.tuna_tv_id = tunaTv.id', // 조인 조건
      )
      .getRawMany(); // Raw 데이터 가져오기

    return result;
  }
}
