import { BaseModel } from 'src/common/entity/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEquipment extends BaseModel {
  //equipment_id
  @Column({
    default: 0,
  })
  @Index({ unique: true })
  user_id: number;

  @Column({
    default: 0,
  })
  equipment_id: number;
}
