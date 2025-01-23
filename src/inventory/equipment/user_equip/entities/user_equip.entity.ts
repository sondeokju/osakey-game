import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index('IDX_UserEquip_user_id_equip_id', ['user_id', 'equip_id'], {
  unique: false,
})
export class UserEquip extends BaseModel {
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
  equip_id: number;

  @Column({
    default: '0',
  })
  equip_level_id: number;

  @Column({
    default: '0',
  })
  equip_skill_id: number;

  @Column({
    default: '0',
  })
  skill_roll_count: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  mount_yn: string;
}
