import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SuitLevelInfo {
  @PrimaryColumn() // 기본 키로 설정
  id: number;
}
