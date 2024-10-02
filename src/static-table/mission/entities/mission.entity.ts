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
  mission_kind: number;

  @Column({
    default: 0,
  })
  mission_condition: number;

  @Column({
    default: 0,
  })
  mission_desc: string;
}
