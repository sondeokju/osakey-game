import { GoogleService } from './sns/google/google.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AppleService } from './sns/apple/apple.service';
import { ZLoginLogModule } from 'src/game_log/login/z_login_log/z_login_log.module';
import { InvenModule } from 'src/supervisor/inven/inven.module';
import { GameLogsModule } from 'src/game_log/game_logs/game_logs.module';

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule,
    ZLoginLogModule,
    InvenModule,
    GameLogsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleService, AppleService],
  exports: [AuthService],
})
export class AuthModule {}
