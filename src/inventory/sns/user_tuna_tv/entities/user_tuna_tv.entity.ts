import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index(['user_id', 'upload_yn'], { unique: false })
export class UserTunaTv extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    default: '',
  })
  tuna_title: string;

  @Column({
    default: '',
  })
  ingame_kind: string;

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
    default: '0',
  })
  score: number;

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

  @Column({
    default: '0',
  })
  view_cnt: number;
}
