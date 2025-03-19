import { Injectable } from '@nestjs/common';
import { QueryRunner, DataSource } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  // ✅ JWT 검증 메서드 추가
  async verifyToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error(`JWT 검증 실패: ${error.message}`);
    }
  }
}
