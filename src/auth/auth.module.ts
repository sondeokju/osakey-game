import { GoogleService } from './sns/google/google.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AppleService } from './sns/apple/apple.service';
import { ZLoginLogService } from 'src/game_log/login/z_login_log/z_login_log.service';
import { ZLoginLog } from 'src/game_log/login/z_login_log/entities/z_login_log.entity';

@Module({
  imports: [JwtModule.register({}), UsersModule, ZLoginLog],
  controllers: [AuthController],
  providers: [AuthService, GoogleService, AppleService, ZLoginLogService],
  exports: [AuthService],
})
export class AuthModule {}
