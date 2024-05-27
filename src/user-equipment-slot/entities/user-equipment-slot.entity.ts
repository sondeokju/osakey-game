import { BaseModel } from 'src/common/entity/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEquipmentSlot extends BaseModel {
  @Column({
    unique: true,
    default: 0,
  })
  user_id: number;

  @Column({
    default: 0,
  })
  equip_1: number;

  @Column({
    default: 0,
  })
  equip_2: number;

  @Column({
    default: 0,
  })
  equip_3: number;

  @Column({
    default: 0,
  })
  equip_4: number;

  @Column({
    default: 0,
  })
  equip_5: number;

  @Column({
    default: 0,
  })
  equip_6: number;
}
