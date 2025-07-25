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
@Index(['url', 'created_at'], { unique: true })
export class LogUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  url: string;

  @Index()
  @Column()
  method: string;

  @Index()
  @CreateDateColumn()
  created_at: Date;
}
