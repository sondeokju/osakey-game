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
export class MissionType {
  @PrimaryColumn()
  mission_type_id: number;

  @Column({
    default: 0,
  })
  type: string;
}
