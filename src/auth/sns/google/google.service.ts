import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleService {
  constructor(private readonly configService: ConfigService) {}

  async google(code: string) {
    if (!code) {
      return { error: 'Authorization code not found in callback' };
    }

    try {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code: code,
          client_id:
            '781512529596-vb3bgbl9chuc91a3ths65j2gaf1ncoch.apps.googleusercontent.com',
          client_secret: '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',
          //client_id: process.env.GOOGLE_CLIENT_ID || '', // 환경 변수 사용
          //client_secret: process.env.GOOGLE_CLIENT_SECRET || '', // 환경 변수 사용
          redirect_uri: 'https://leda-pgs.actioncatuniverse.com/auth/callback',
          grant_type: 'authorization_code',
        }),
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        console.error('Token exchange failed:', errorData);
        return {
          error: `Token exchange failed: ${errorData.error_description}`,
        };
      }

      const tokenData = await tokenResponse.json();
      const googleAccessToken = tokenData.access_token;

      const userInfoResponse = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: `Bearer ${googleAccessToken}` },
        },
      );

      if (!userInfoResponse.ok) {
        const errorData = await userInfoResponse.json();
        console.error('Failed to fetch user info:', errorData);
        return { error: 'Unable to fetch user information from Google' };
      }

      const userInfo = await userInfoResponse.json();

      return userInfo;
    } catch (error) {
      console.error('Error during Google authentication:', error);
      return { error: 'An unexpected error occurred during authentication' };
    }
  }
}
