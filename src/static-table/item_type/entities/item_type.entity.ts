import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ItemType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: '',
  })
  item_type: string;

  @Column({
    default: '',
  })
  type_desc: string;

  @Column({
    default: 0,
  })
  item_id_min: number;

  @Column({
    default: 0,
  })
  item_id_max: number;
}
