import {
  Controller,
  UnauthorizedException,
  UseGuards,
  Request,
  Query,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, Get, Post, Headers } from '@nestjs/common';
import { raw } from 'express';
import {
  MaxLengthPipe,
  MinLengthPipe,
  PasswordPipe,
} from './pipe/password.pipe';
import { BasicTokenGuard } from './guard/basic-token.guard';
import {
  AccessTokenGuard,
  RefreshTokenGuard,
} from './guard/bearer-token.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Get('callback')
  async handleGoogleCallback(
    @Query('code') code: string,
    @Query('scope') scope: string,
    @Query('authuser') authuser: string,
    @Query('hd') hd: string,
    @Query('prompt') prompt: string,
  ) {
    console.log('Google OAuth Callback Invoked');
    console.log('code:', code);
    console.log('scope:', scope);
    console.log('authuser:', authuser);
    console.log('hd:', hd);
    console.log('prompt:', prompt);

    if (!code) {
      return {
        error: 'Code not found in callback',
      };
    }

    try {
      // Google OAuth2 Token Endpoint 호출
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

      const tokenData = await tokenResponse.json();
      console.log('Token Response:', tokenData);

      // 에러 처리
      if (tokenData.error) {
        console.error('Token exchange failed:', tokenData.error_description);
        return {
          error: `Token exchange failed: ${tokenData.error_description}`,
        };
      }

      // 액세스 토큰 사용 예시
      const accessToken = tokenData.access_token;
      return {
        accessToken,
      };
    } catch (error) {
      console.error('Error during token exchange:', error);
      return {
        error: 'An error occurred during the token exchange',
      };
    }
  }

  @Post('token/access')
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  async postTokenAccess(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    const newToken = await this.authService.rotateToken(token, false);

    /**
     * {accessToken: {token}}
     */
    return {
      accessToken: newToken,
    };
  }

  @Post('token/refresh')
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  async postTokenRefresh(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    const newToken = await this.authService.rotateToken(token, true);

    /**
     * {refreshToken: {token}}
     */
    return {
      refreshToken: newToken,
    };
  }

  @Post('login/email')
  @IsPublic()
  @UseGuards(BasicTokenGuard)
  postLoginEmail(@Headers('authorization') rawToken: string) {
    // email:password -> base64
    //console.log('rawToken', rawToken);

    //throw new UnauthorizedException('헤더가 비어있습니다.');

    const token = this.authService.extractTokenFromHeader(rawToken, false);

    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.loginWithEmail(credentials);
  }

  // @Post('login/email')
  // loginEmail(@Body('email') email: string, @Body('password') password: string) {
  //   return this.authService.loginWithEmail({
  //     email,
  //     password,
  //   });
  // }

  // @Post('register/email')
  // postRegisterEmail(
  //   @Body('nickname') nickname: string,
  //   @Body('email') email: string,
  //   @Body('password', new MaxLengthPipe(8, '비밀번호'), new MinLengthPipe(3))
  //   password: string,
  // ) {
  //   return this.authService.registerWithEmail({
  //     nickname,
  //     email,
  //     password,
  //   });
  // }
  @Post('register/email')
  @IsPublic()
  postRegisterEmail(@Body() body: RegisterUserDto) {
    return this.authService.registerWithEmail(body);
  }
}
