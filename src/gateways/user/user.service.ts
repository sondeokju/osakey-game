import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async verifyToken(token: string): Promise<any> {
    let userId = '';

    console.log('⛔ JWT_SECRET:', process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded가 객체인지 확인 후 userId 추출
    if (typeof decoded === 'string') {
      const parsed = JSON.parse(decoded);
      console.log('⛔ Parsed:', parsed);
      userId = parsed.user_id || parsed.userId;
    } else if (typeof decoded === 'object') {
      userId = decoded.user_id || decoded.userId;
      console.log('⛔ verifyToken userId:', userId);
    } else {
      console.error('⛔ JWT 반환값이 예상과 다릅니다:', decoded);
    }
    return userId;
  }
}
