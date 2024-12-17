import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
// @Index('IDX_UserEquip_user_id_equip_id', ['user_id', 'equip_id'], {
//   unique: false,
// })
export class UserEquipSlot extends BaseModel {
  @Column({
    default: '',
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    default: '0',
  })
  acc: number;

  @Column({
    default: '0',
  })
  engine: number;

  @Column({
    default: '0',
  })
  armor: number;

  @Column({
    default: '0',
  })
  boost: number;

  @Column({
    default: '0',
  })
  shoes: number;
  @Column({
    default: '0',
  })
  weapon: number;
}
