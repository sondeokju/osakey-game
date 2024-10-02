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
export class MissionKind {
  @PrimaryColumn()
  mission_type_id: number;

  @Column({
    default: 0,
  })
  type: string;
}
