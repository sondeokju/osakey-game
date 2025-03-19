import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('game_logs') // 테이블 이름 지정
@Index('idx_log_user_type', ['user_id', 'log_type']) // 복합 인덱스 추가
@Index('idx_log_type', ['log_type']) // log_type 인덱스 추가
@Index('idx_user_id', ['user_id']) // user_id 인덱스 추가
export class GameLogs {
  @PrimaryGeneratedColumn('increment')
  id: number; // AUTO_INCREMENT 기본키

  @Column({ type: 'varchar', length: 128 })
  log_type: string; // 로그 유형 (예: "quest", "battle", "shop")

  @Column({
    length: 10,
    type: 'char',
  })
  @Index({ unique: false })
  user_id: string;

  @Column({ type: 'json' })
  content: any; // JSON 데이터 저장

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date; // 자동 생성 시간
}
