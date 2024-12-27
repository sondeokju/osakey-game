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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('callback')
  async handleGoogleCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    console.log('code', code);
    if (!code) {
      //return res.status(400).send('Code not found in callback.');
    }

    // code를 사용해 Google 토큰 엔드포인트로 액세스 토큰 요청
    // const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: new URLSearchParams({
    //     code: code,
    //     client_id: 'YOUR_CLIENT_ID',
    //     client_secret: 'YOUR_CLIENT_SECRET',
    //     redirect_uri: 'https://test.com/auth/callback',
    //     grant_type: 'authorization_code',
    //   }),
    // });

    //const tokenData = await tokenResponse.json();

    // if (tokenData.error) {
    //   return res
    //     .status(500)
    //     .send(`Token exchange failed: ${tokenData.error_description}`);
    // }

    // 액세스 토큰 사용 예시
    //const accessToken = tokenData.access_token;

    //return res.send('Google Authentication Successful!');
    return '';
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
