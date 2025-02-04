import { Module } from '@nestjs/common';
import { GachaOutputService } from './gacha_output.service';
import { GachaOutputController } from './gacha_output.controller';
import { GachaOutput } from './entities/gacha_output.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GachaOutput])],
  exports: [GachaOutputService],
  controllers: [GachaOutputController],
  providers: [GachaOutputService],
})
export class GachaOutputModule {}
