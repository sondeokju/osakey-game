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
  item_type: number;

  @Column({
    default: '',
  })
  item_enum: string;

  @Column({
    default: '',
  })
  type_desc: string;
}
