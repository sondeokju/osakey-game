import { Module } from '@nestjs/common';
import { UserGachaCheckService } from './user_gacha_check.service';
import { UserGachaCheckController } from './user_gacha_check.controller';
import { UserGachaCheck } from './entities/user_gacha_check.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserGachaCheck])],
  exports: [UserGachaCheckService],
  controllers: [UserGachaCheckController],
  providers: [UserGachaCheckService],
})
export class UserGachaCheckModule {}
