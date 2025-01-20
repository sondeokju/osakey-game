import { GoogleService } from './sns/google/google.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AppleService } from './sns/apple/apple.service';
import { ZLoginLogModule } from 'src/game_log/login/z_login_log/z_login_log.module';

@Module({
  imports: [JwtModule.register({}), UsersModule, ZLoginLogModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleService, AppleService],
  exports: [AuthService],
})
export class AuthModule {}
