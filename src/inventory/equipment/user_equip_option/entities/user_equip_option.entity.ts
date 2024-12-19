import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index('IDX_UserEquip_user_id_equip_id', ['user_id', 'equip_id'], {
  unique: true,
})
export class UserEquipOption extends BaseModel {
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
  origin_equip_id: number;

  @Column({
    default: '0',
  })
  option_grade: number;

  @Column({
    default: '',
    type: 'varchar',
    length: 30,
  })
  option_type: string;

  @Column({
    default: 0.0,
    type: 'double',
  })
  option_value: number;
}
