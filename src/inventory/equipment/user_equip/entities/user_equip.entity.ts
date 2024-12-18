import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index('IDX_UserEquip_user_id_equip_id', ['user_id', 'equip_id'], {
  unique: true,
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
    type: 'boolean',
    default: false,
  })
  option_1_yn: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  option_2_yn: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  option_3_yn: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  option_4_yn: boolean;
}
