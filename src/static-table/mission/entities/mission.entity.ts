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
export class Mission {
  @PrimaryColumn()
  mission_id: number;

  @Column({
    default: 0,
  })
  category_id: number;
}
