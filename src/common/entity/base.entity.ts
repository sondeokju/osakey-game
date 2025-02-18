import {
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @UpdateDateColumn()
  update_at: Date;

  @Index()
  @CreateDateColumn()
  created_at: Date;
}
