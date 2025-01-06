import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from 'src/common/const/env-keys.const';

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
          client_id: this.configService.get<string>(GOOGLE_CLIENT_ID),
          client_secret: this.configService.get<string>(GOOGLE_CLIENT_SECRET),
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
      console.log(userInfo);

      return userInfo;
    } catch (error) {
      console.error('Error during Google authentication:', error);
      return { error: 'An unexpected error occurred during authentication' };
    }
  }

  //   async function refreshAccessToken(refreshToken: string) {
  //   const response = await fetch('https://oauth2.googleapis.com/token', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     body: new URLSearchParams({
  //       client_id: process.env.GOOGLE_CLIENT_ID,
  //       client_secret: process.env.GOOGLE_CLIENT_SECRET,
  //       refresh_token: refreshToken,
  //       grant_type: 'refresh_token',
  //     }),
  //   });

  //   const tokenData = await response.json();
  //   if (tokenData.error) {
  //     throw new Error(`Failed to refresh token: ${tokenData.error_description}`);
  //   }
  //   return tokenData.access_token;
  // }
}
