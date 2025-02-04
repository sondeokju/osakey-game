import { Module } from '@nestjs/common';
import { GachaService } from './gacha.service';
import { GachaController } from './gacha.controller';
import { Gacha } from './entities/gacha.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Gacha])],
  exports: [GachaService],
  controllers: [GachaController],
  providers: [GachaService],
})
export class GachaModule {}
