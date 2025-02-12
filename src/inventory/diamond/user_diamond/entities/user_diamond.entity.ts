import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
@Index('IDX_user_diamnd_user_id_member_id', ['user_id', 'member_id'], {
  unique: true,
}) // 복합 인덱스 설정
export class UserDiamond extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    length: 256,
    type: 'varchar',
    default: '',
  })
  @Index({ unique: true })
  member_id: string;

  @Column({
    default: 0,
  })
  diamond_paid: number;

  @Column({
    default: 0,
  })
  diamond_bonus: number;

  @Column({
    default: 0,
  })
  diamond_free: number;
}
