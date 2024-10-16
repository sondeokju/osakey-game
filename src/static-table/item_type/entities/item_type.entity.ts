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
}
