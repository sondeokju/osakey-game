import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppleService {
  constructor(private readonly configService: ConfigService) {}

  async apple(code: string, id_token: string) {
    if (!code || !id_token) {
      return { error: 'Authorization code or ID token not found in callback' };
    }
    try {
      // 애플 토큰 교환 요청
      const tokenResponse = await fetch(
        'https://appleid.apple.com/auth/token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            code: code,
            client_id: 'com.example.yourclientid', // 애플 개발자 계정에 등록된 클라이언트 ID
            client_secret: this.generateAppleClientSecret(), // 클라이언트 비밀키 생성 함수
            redirect_uri: 'https://your-app.com/auth/apple/callback',
            grant_type: 'authorization_code',
          }),
        },
      );
      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        console.error('Token exchange failed:', errorData);
        return {
          error: `Token exchange failed: ${errorData.error_description}`,
        };
      }
      const tokenData = await tokenResponse.json();
      const appleAccessToken = tokenData.access_token;
      // ID Token 검증 및 유저 정보 파싱
      const userPayload = this.decodeJwt(id_token);
      if (!userPayload || !userPayload.sub) {
        return {
          error: 'Failed to decode ID token or missing user information',
        };
      }

      return userPayload;
    } catch (error) {
      console.error('Error during Apple authentication:', error);
      return { error: 'An unexpected error occurred during authentication' };
    }
  }

  // JWT 디코드 함수
  private decodeJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  // Apple 클라이언트 비밀키 생성 함수
  private generateAppleClientSecret(): string {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jwt = require('jsonwebtoken');
    const privateKey = `-----BEGIN PRIVATE KEY-----
                        <Your_Private_Key_Here>
                        -----END PRIVATE KEY-----`;

    const payload = {
      iss: '<Your_Team_ID>',
      aud: 'https://appleid.apple.com',
      sub: 'com.example.yourclientid', // 클라이언트 ID
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // 1시간 유효
    };

    return jwt.sign(payload, privateKey, {
      algorithm: 'ES256',
      keyid: '<Your_Key_ID>',
    });
  }
}
