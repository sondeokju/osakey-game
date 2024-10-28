import {
  Column,
  CreateDateColumn,
  Double,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Index(['url', 'timestamp'], { unique: false })
export class LogUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  url: string;

  @Index()
  method: string;

  @Index()
  @CreateDateColumn()
  created_at: Date;
}
