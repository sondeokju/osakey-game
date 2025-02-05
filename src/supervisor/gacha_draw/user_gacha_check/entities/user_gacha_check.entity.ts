import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
//@Index('IDX_user_achievements_id_user_id', ['id', 'user_id'], { unique: true }) // 복합 인덱스 설정
export class UserGachaCheck extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    default: 0,
  })
  fixed_item_grade_1: number;

  @Column({
    default: 0,
  })
  fixed_item_grade_1_count: number;

  @Column({
    default: 0,
  })
  fixed_item_grade_2: number;

  @Column({
    default: 0,
  })
  fixed_item_grade_2_count: number;
}
