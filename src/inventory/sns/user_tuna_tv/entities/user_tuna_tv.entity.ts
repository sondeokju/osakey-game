import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class UserTunaTv extends BaseModel {
  @Column({
    default: 0,
  })
  @Index({ unique: true })
  user_id: number;

  @Column({
    default: '',
  })
  @Index({ unique: false })
  tuna_tv_id: string;

  @Column({
    default: '',
  })
  ingame_kind: string;

  @Column({
    default: '0',
  })
  tuna_title: number;

  @Column({
    default: '0',
  })
  select_1: number;

  @Column({
    default: '0',
  })
  select_2: number;

  @Column({
    default: '0',
  })
  select_3: number;

  @Column({
    default: 'N',
  })
  upload_yn: string;

  @Column({
    default: '',
    length: 512,
  })
  upload_txt: string;

  @Column({
    default: '0',
  })
  like_cnt: number;
}
