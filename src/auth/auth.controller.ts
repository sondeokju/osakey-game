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
import { QueryRunner as QR } from 'typeorm';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('social/login')
  async socialLogin(
    @Body('device_id') device_id: string,
    @Body('email') email: string,
    @Body('os_type') os_type: string,
    @Body('sub') sub: string,
    //@QueryRunner() qr: QR,
  ) {
    return this.authService.socialLogin(device_id, email, os_type, sub);
  }

  @IsPublic()
  @Post('line-social/login')
  async lineSocialLogin(
    @Body('socialData') socialData: any,
    @QueryRunner() qr: QR,
  ) {
    console.log(socialData);
    return this.authService.lineSocialLogin(socialData, qr);
  }

  // @IsPublic()
  // @Get('callback')
  // async handleGoogleCallback(@Query('code') code: string) {
  //   return this.authService.handleGoogleCallback(code);
  // }

  @IsPublic()
  @Get('apple/callback')
  async handleAppleCallback(
    @Query('code') code: string,
    @Query('code') id_token: string,
  ) {
    return this.authService.handleAppleCallback(code, id_token);
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
