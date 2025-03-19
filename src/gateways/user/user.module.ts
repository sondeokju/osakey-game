import { Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { UserService } from './user.service';
import { ZLoginLogModule } from 'src/game_log/login/z_login_log/z_login_log.module';

@Module({
  imports: [ZLoginLogModule],
  providers: [UserGateway, UserService],
  exports: [UserService],
})
export class UserModule {}
