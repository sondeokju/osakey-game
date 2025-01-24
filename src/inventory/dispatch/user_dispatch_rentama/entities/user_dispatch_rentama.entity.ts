import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
//@Index('IDX_NAME', ['columnA', 'columnB'], { unique: true }) // 복합 인덱스 설정
export class UserDispatchRentama extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    default: '0',
  })
  @Index({ unique: false })
  rentama_level: number;

  @Column({
    default: '0',
  })
  @Index({ unique: false })
  current_rentama_exp: number;

  @Column({
    default: '0',
  })
  @Index({ unique: false })
  rentama_equip_id: number;
}
