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
  @PrimaryColumn()
  item_type: number;

  @Column({
    default: 0,
  })
  item_enum: string;
}
