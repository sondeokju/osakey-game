import { Injectable } from '@nestjs/common';
import { QueryRunner, DataSource } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  // ✅ JWT 검증 메서드 추가
  async verifyToken(token: string): Promise<any> {
    let userId = '';

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // decoded가 객체인지 확인 후 userId 추출
      if (typeof decoded === 'string') {
        const parsed = JSON.parse(decoded);
        console.log('⛔ Parsed:', parsed);
        userId = parsed.user_id || parsed.userId;
      } else if (typeof decoded === 'object') {
        userId = decoded.user_id || decoded.userId;
      } else {
        console.error('⛔ JWT 반환값이 예상과 다릅니다:', decoded);
      }
      return userId;
    } catch (error) {
      throw new Error(`JWT 검증 실패: ${error.message}`);
    }
  }
}
