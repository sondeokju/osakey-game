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
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import qs from 'qs';
//import * as qs from 'querystring';

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
  //@UseInterceptors(TransactionInterceptor)
  async lineSocialLogin2(
    @Body('socialData') socialData: any,
    //@Request() req: any, // <-- req 객체 추가
    //@QueryRunner() qr: QR,
  ) {
    // 데이터 변환 로직
    if (typeof socialData === 'string') {
      socialData = JSON.parse(socialData);
    }

    console.log('Final parsed socialData:', socialData);

    // 값 추출 및 처리
    const member_id = socialData?.memberid ?? null;
    const social_user_id = socialData?.userid ?? null;

    console.log('lineSocialLogin socialData memberid:', member_id);
    console.log('lineSocialLogin social_user_id:', social_user_id);

    const result = await this.authService.lineSocialLogin(socialData);
    //console.log('line-social/login', result);
    return JSON.stringify(result);
  }

  // @IsPublic()
  // @Post('line-social/login')
  // //@UseInterceptors(TransactionInterceptor)
  // async lineSocialLogin2(
  //   @Body('socialData') socialData: any,
  //   @Request() req: any, // <-- req 객체 추가
  //   //@QueryRunner() qr: QR,
  // ) {
  //   // 데이터 변환 로직
  //   if (typeof socialData === 'string') {
  //     const trimmedData = socialData.trim();

  //     if (req.headers['content-type']?.includes('application/json')) {
  //       try {
  //         socialData = JSON.parse(trimmedData);
  //       } catch (error) {
  //         console.error(
  //           'JSON parsing error:',
  //           error.message,
  //           'Received:',
  //           socialData,
  //         );
  //         throw new UnauthorizedException('Invalid JSON format');
  //       }
  //     } else if (
  //       req.headers['content-type']?.includes(
  //         'application/x-www-form-urlencoded',
  //       )
  //     ) {
  //       try {
  //         socialData = qs.parse(trimmedData);

  //         // 만약 데이터가 JSON 형식으로 변환될 필요가 있으면 변환
  //         const firstKey = Object.keys(socialData)[0];
  //         if (firstKey.startsWith('{') || firstKey.startsWith('[')) {
  //           try {
  //             socialData = JSON.parse(firstKey);
  //           } catch (error) {
  //             console.error('Error parsing extracted JSON:', error.message);
  //           }
  //         }
  //       } catch (error) {
  //         console.error(
  //           'Querystring parsing error:',
  //           error.message,
  //           'Received:',
  //           socialData,
  //         );
  //       }
  //     }
  //   }

  //   console.log('Final parsed socialData:', socialData);

  //   // 값 추출 및 처리
  //   const member_id = socialData?.memberid ?? null;
  //   const social_user_id = socialData?.userid ?? null;

  //   console.log('lineSocialLogin socialData memberid:', member_id);
  //   console.log('lineSocialLogin social_user_id:', social_user_id);

  //   const result = await this.authService.lineSocialLogin(socialData, req);
  //   //console.log('line-social/login', result);
  //   return JSON.stringify(result);
  // }

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
